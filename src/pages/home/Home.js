import './home.css';
import LazyNoteCard from '../../components/lazyNoteCard/LazyNoteCard';
import React, { useEffect, useState, Suspense } from 'react';
import { UserAuth } from '../../components/context/AuthContext';
import { db } from '../../Firebase-config';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

const NoteCard = React.lazy(() => import('../../components/noteCard/NoteCard'))


const Home = () => {
    const [note, setNote] = useState([]);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    // FROM THE CONTEXT
    const { user, theme, switchTheme, logOut } = UserAuth();

    // TO REFER TO THE 'NOTES' COLLECTION ON FIREBASE
    const collectionRef = collection(db, 'notes');

    // const noteQuery = query(collectionRef, where("user.uid", "=", "uid"))

    const handleSignOut = async () => {
        try {
            if(window.confirm('Are you sure you want to log out?')) {
                await logOut();
            };
        }
        catch(error) {
            console.log(error)
        };
    };

    // TO GET NOTES FROM FIREBASE
    const getNotes =  () => {
        // const data = await getDocs(collectionRef)
        onSnapshot(collectionRef, (data) => {
            setNote(data.docs.map((doc) => {
                return ({...doc.data(), id: doc.id})
            }))
            console.log("note:", note)
        })
    };

    // setNote(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

    useEffect(() => {
        getNotes();
    }, []);

    // TO NAVIGATE AFTER LOG OUT
    useEffect(() => {
      if(user === null) {
        navigate('/')
      }
    }, [user]);


    return (
        <div className="home" data-theme={theme} >
            <div className='home-container'>
                <div className="top">
                    <div className="first">
                        { user && user.displayName !== null ? <p>Welcome {user.displayName}</p> : 'Welcome dear user'}
                    </div>
                    <div className="second">
                        <p> <Link to='/write' className='add-note'> Add Note</Link> </p>
                        <p onClick={switchTheme} >Toggle Mode</p>
                        <p onClick={handleSignOut}>Log out</p>
                    </div>
                </div>
                <div className="search-bar">
                    {/* <span> <BsSearch /> </span> */}
                    <input 
                        type="search" 
                        placeholder='Search for note...' 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <p className="your-notes">Your Notes</p>
                <div className="notes">

                    { note && note.filter((item) => {
                        return search.toLowerCase() === '' ? item : 
                        item.title.toLowerCase().includes(search)
                    }).map((item) => <Suspense key={item.id} fallback= { <LazyNoteCard /> }> <NoteCard item={item} /> </Suspense> ) }
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
