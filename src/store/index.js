import { createStore } from 'vuex'
import router from '../router'
import { auth, db } from '../firebase/init.js'


import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile
  } from 'firebase/auth'

  import { doc, setDoc, getDoc } from "firebase/firestore";

  export default createStore({
    state: {
      user: null,
      userFiles: [],
      fileContents: []
    },
    getters: {
    },
    mutations: {
      SET_USER(state, user){
        state.user = user
        localStorage.setItem('user', JSON.stringify(user));
      },
      CLEAR_USER(state){
        state.user = null
      },
      SET_USER_FILES(state, files) {
        state.userFiles = files;
        console.log(state.userFiles)
      },
      SET_FILE_CONTENTS(state, contents) {
        state.fileContents = contents;
        console.log(state.fileContents)
      },
      ADD_USER_FILE(state, file) {
        state.userFiles.push(file);
        console.log(state.userFiles)
        this.dispatch('loadFiles');
      },
  
      ADD_FILE_CONTENT(state, content) {
        state.fileContents.push(content);
        console.log(state.fileContents)
        this.dispatch('loadFiles');
      },
      DELETE_FILE(state, file) {
        const fileIndex = state.userFiles.findIndex(f => f === file);
        if (fileIndex !== -1) {
          state.userFiles.splice(fileIndex, 1);
          state.fileContents.splice(fileIndex, 1);
        }
      },
    },
    actions: {
       async login ({ commit}, details){
         const { email, password } = details
  
         try {
          await signInWithEmailAndPassword(auth, email, password)
          //localStorage.setItem('userId', JSON.stringify(auth.currentUser));
         } catch (error) {
          switch(error.code){
            case 'auth/user-not-found':
              alert("User not found")
              break
            case 'auth/wrong-password':
              alert('Wrong Password')
              break
            default:
              alert("Something went wrong")
          }
  
          return
         }
  
         commit('SET_USER', auth.currentUser)
  
         router.push('/main')
       },
  
       async register ({ commit}, details){
         const { username, email, password } = details
  
         try {
          await createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
              displayName: username
            })
          })
         } catch (error) {
          switch(error.code){
            case 'auth/email-already-in-use':
              alert("Email is already in use")
              break
            case 'auth/invalid-email':
              alert('Invalid Email')
              break
            case 'auth/operation-not-allwoed':
              alert('Operation not Allowed')
              break
            case 'auth/weak-password':
              alert('Weak Password')
              break
            default:
              alert("Something went wrong")
          }
  
          return
         }
  
         commit('SET_USER', auth.currentUser)
  
         router.push('/main')
       },
  
       async logout({ commit }){
         await signOut(auth)
  
         commit('CLEAR_USER')
         localStorage.removeItem('userId');
  
         router.push('/login')
       },
  
       fetchUser({ commit }, state){
        const storedUserId = JSON.parse(localStorage.getItem('user'))
        console.log(storedUserId)
        if (storedUserId) {
          auth.onAuthStateChanged((user) => {
            if (user) {
              commit('SET_USER', user);
            }
          });
        } else {
          auth.onAuthStateChanged(async user => {
            if(user == null){
              commit('CLEAR_USER')
            } else {
              commit('SET_USER', user)
    
              if(router.isReady() && router.currentRoute.value.path === '/login'){
                router.push('/main')
              }
            }
          })
        }
       },
       async loadFiles({ commit, state }) {
        const storedUserId = JSON.parse(localStorage.getItem('user'))
        if (storedUserId) {
          //const userFilesRef = await db.collection('userFiles').doc(state.user.uid);
          const userFilesRef = await getDoc(doc(db, 'userFiles', storedUserId.uid))
          
          if (userFilesRef.exists) {
            const userData = userFilesRef.data();
            console.log(userData)
            commit('SET_USER_FILES', userData.files);
            commit('SET_FILE_CONTENTS', userData.fileContents);
          } else {
            commit('SET_USER_FILES', []);
            commit('SET_FILE_CONTENTS', []);
          }
        }
      },
  
      async saveFilesToFirestore({ state }, userId) {
        const storedUserId = JSON.parse(localStorage.getItem('user'))
        console.log(userId)
        if (storedUserId) {
          const userFilesRef = await setDoc(doc(db, 'userFiles', storedUserId.uid), {
            files: state.userFiles,
            fileContents: state.fileContents
          })
          //call loadFiles()
          this.dispatch('loadFiles');
        } else {
          console.log("User is not authenticated. Cannot save files to Firestore.")
        }
      },

      async deleteFile({ commit, state }, file) {
        try {
          const storedUserId = JSON.parse(localStorage.getItem('user'))
          // Delete the file from Firestore or any other backend service here
          // For example, you can use Firebase's Firestore API to delete the document
          // using `db.collection('userFiles').doc(userId).delete()`
  
          // Once the file is successfully deleted from the backend, commit the mutation
          commit("DELETE_FILE", file);
  
          // Save the updated files and fileContents arrays to Firestore
          this.dispatch('saveFilesToFirestore', storedUserId.uid, storedUserId.uid.userFiles, storedUserId.uid.fileContents);
          this.dispatch('loadFiles');
        } catch (error) {
          // Handle the error, show a message, etc.
          console.error("Error deleting file:", error);
        }
      },
    }
  })