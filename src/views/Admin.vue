<template>
    
    <div>
        <AdminDashboard />
    </div>
    
</template>


<script>
import firebase from "firebase";
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
export default {
    name: "admin",
    components: {
        AdminDashboard
    },
    data() {
        return {
            users: [],
            user: null
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
        this.users = [];
        firebase
            .firestore()
            .collection("users")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    user.id = doc.id;
                    console.log(doc.data());
                    if (!user.role.admin) this.users.push(user);
                });
            });
    },
    methods: {
        signout() {
            firebase
                .auth()
                .signOut()
                .then(user => {
                    this.$router.push("/login");
                    console.log(user)
                });
        },
        changeRole(uid, event) {
            var addMessage = firebase.functions().httpsCallable("setUserRole");
            var data = { uid: uid, role: { [event.target.value]: true } };
            addMessage(data)
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    }
};
</script>