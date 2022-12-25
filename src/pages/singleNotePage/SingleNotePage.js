import moment from 'moment/moment';
import './singleNotePage.css';
import { useEffect, useState } from 'react';
import { db } from '../../Firebase-config';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../components/context/AuthContext'
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";




const SingleNotePage = () => {
    const [hasLoadTime, setHasLoadTime] = useState(false)
    const [singleNote, setSingleNote] = useState({})

    const { theme } = UserAuth()

    const { id } = useParams()

    const navigate = useNavigate()

    // TO REFER TO THE ID OF SPECIFIC USER FROM FIRESTORE
    const docRef = doc(db, "notes", id);


    useEffect(() => {
        if(id) {
          getSingleNote()
        }
    }, [id])

    // TO GET SINGLE NOTE FROM FIRESTORE DATABASE
    const getSingleNote = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setSingleNote(docSnap.data())
            setHasLoadTime(true)
        } 
        
        else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const deleteNote = (id) => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            const blogToDelete = doc(db, 'notes', id)
            deleteDoc(blogToDelete)
            .then(() => {
                navigate('/home')
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    } 


  return (
    <div className='single-note-container' data-theme={theme} >
        <div className="single-note">
            <h2>{singleNote.title}</h2>
            <p>{singleNote.note}</p>
            
        </div>
        <div className="single-note-footer">
            <p>{hasLoadTime && moment( new Date(singleNote.date.seconds * 1000 + singleNote.date.nanoseconds / 1000000,)).fromNow()}</p>
            <div className='de-edit'>
                <Link to={`/editNote/${id}`} className='edit' style={{textDecoration: 'none'}}> <BiEdit  />  </Link>
                <AiFillDelete className='delete' onClick={() => deleteNote(id)} />
            </div>
        </div>
    </div>
  );
}

export default SingleNotePage;
