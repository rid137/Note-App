import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../../components/context/AuthContext';
import { db } from '../../Firebase-config';
import { collection, addDoc, Timestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import './write.css'


const Write = () => {
  const [data, setData] = useState({})
  const [editMode, setEditMode] = useState(false)

// FROM CONTEXT
  const { user, theme } = UserAuth()

  const { id } = useParams();

  // TO REFER TO THE 'NOTES' COLLECTION IN FIRESTORE DATABASE
  const collectionRef = collection(db, 'notes');

  const navigate = useNavigate();


  useEffect(() => {
    if(id) {
      setEditMode(true)
      getNoteToUpdate(id)
    }
    else {
      setEditMode(false)
      setData({ ...data })
    }
  }, [id]);

  // TO GET SINGLE NOTE FOR UPDATE
  const getNoteToUpdate = async () => {
    const docSnap = await getDoc(doc(db, "notes", id));
    if (docSnap.exists()) {
      setData(docSnap.data())
      console.log("data:", data)
    } 
    else {
      // doc.data() will be undefined in this case
      alert("No such document!");
    }
  }


  const handleSave = async (e) => {
    e.preventDefault()
    
    if(!editMode) {
      await addDoc(collectionRef, {
      title: data.title,
      note: data.note,
      name: user.displayName, 
      uid: user.uid,
      date: Timestamp.fromDate(new Date()),
      });
      navigate('/home')
    }
    else {
      updateDoc(doc(db, "notes", id), {
        title: data.title,
        note: data.note,
        name: user.displayName, 
        uid: user.uid,
        date: Timestamp.fromDate(new Date()),
      })
      .then (() => {
        alert('data updated')
      }) 
      .catch((err) => {
        alert(err.message)
      });
      navigate('/home')
    }
  }

  // TO HANDLE THE INPUT FIELDS
  const handleInputs = (e) => {
    const newInput = { [e.target.name]: e.target.value};

    setData({...data, ...newInput})
  }


  return (
    <div className='write-container' data-theme={theme} >
      <div className="write">
        <h3>Write Notes</h3>
            <form action="">
                <label htmlFor="">Title</label>
                <input 
                    type="text" 
                    value={data.title || ''}
                    placeholder='add title' 
                    name='title'
                    onChange={(e) => handleInputs(e)}
                    autoFocus
                />

                <label htmlFor="">Notes</label>
                <textarea 
                    name="note" 
                    value={data.note || ''}
                    cols="30" 
                    rows="10" 
                    placeholder='note'
                    onChange={(e) => handleInputs(e)}>
                </textarea>

                <button onClick={handleSave} className='submit-btn'>{!editMode ? 'Add Note' : 'Update Note'}</button>
            </form>
      </div>
    </div>
  );
}

export default Write;
