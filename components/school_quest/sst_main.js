import { getFirestore , collection ,getDocs,getDoc,onSnapshot,doc} from "firebase/firestore";
import { auth_tool ,db ,app} from '../../firebase-config';
import { getAuth } from "firebase/auth";
import { getStorage,ref,listAll} from "firebase/storage";
import { useState } from "react";

export function get_student_id(){
    return getAuth().currentUser.email.split('@')[0];
}

export function get_summited_quest(){
    const storage = getStorage();
    const my_id = get_student_id();
    let summited = [];
    const v = listAll(ref(storage,"/quest_summit")).then(
        (res) => {
            res.items.forEach((item) => {
                const focus = item.toString().split('-')
                const student_id = focus[1].split('/').slice(-1).toString()
                const quest_name = focus.slice(-1).toString()
                //console.log(student_id,quest_name)
                //console.log(student_id,quest_name)
                if (student_id == my_id){
                    //console.log(student_id,quest_name)
                    summited.push(quest_name)
                    //set_funct(quest_name,...summited)
                    //summited = [...summited,quest_name]
                    //setSummitedQuest(...summited_quest,quest_name)
                }
            })
            return summited;
            //return summited;
            //setFunct(summited)
        }
    )
    return v;
}

export function get_accomplish_quest(){
    const db = getFirestore(app);
    const unsub = onSnapshot(doc(db,("users"+"/"+get_student_id())), (doc) => {
        //const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(doc.get('completed_quest'))
      });
}


export default function communication(quest_funct){
    //server.get_quest() something
    const db = getFirestore(app);
    const q = collection(db, "school_events");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const all_data = {};
        querySnapshot.forEach((doc) => {
            const describe = doc.get('describe')
            const name = doc.get('name')
            const point = doc.get('point')
            const accomplishment = doc.get('accomplishment')
            const out_dated = doc.get('out-dated')
            const obj ={'describe':describe,'out-dated':out_dated,'name':name,'point':point,'accomplishment':accomplishment}
            
            all_data[doc.id] = obj;
        ;})    
        //console.log(all_data)
        quest_funct(all_data);
    });
}
