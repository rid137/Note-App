import './noteCard.css'
import moment from 'moment/moment';
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { UserAuth } from '../context/AuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase-config';
import { Link } from 'react-router-dom';



const NoteCard = ({item}) => {
    
    const {date, name, id, note, title, uid} = item

    const { user } = UserAuth()


    // DELETE NOTE
    const deleteNote = (id) => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            const blogToDelete = doc(db, 'notes', id)
            deleteDoc(blogToDelete)
            .then(() => {
                alert('note deleted')
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }   

    // TO HANDLE THE TIME RETURNED FROM FIREBASE
    const fireBaseTime = new Date(
        date.seconds * 1000 + date.nanoseconds / 1000000,
    );

    // TO CLIP THE LONG NOTES
    const trimNote = (word) => {
        const words = word.substring(0, 200) + '...'
        return words
    };


  return (
    <>
        {
            user && item.id !== null && user.uid === item.uid && item && (
                <div className="note-card">
                    <div className="overlay">
                    {console.log("item",item)}

                        <div className="overlay-content">
                            <button className='overlay-btn'> <Link to={`/note/${item.id}`} className='read-more'> Read more </Link> </button>
                            <div className="del-edit">
                                <Link to={`/editNote/${item.id}`} style={{textDecoration: 'none'}}> <BiEdit className='del' />  </Link>
                                <AiFillDelete className='edit' onClick={() => deleteNote(item.id)} />
                            </div>
                        </div>
                    </div>
                    <h3>{title}</h3>
                    <p>{trimNote(note)}</p>
                    <div className="note-card-footer">
                        <p>{moment(fireBaseTime).fromNow()}</p>
                    </div>
                </div>
            )
        }  
        </>     
    // </div>
  );
}

export default NoteCard;
