import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const ImgUpload = ({ onChange, src }) => (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img htmlFor="photo-upload" src={src} />
      </div>
      <input id="photo-upload" type="file" onChange={onChange} />
    </label>
  );

  
  const ProfilePic = ({ label, onChange, value }) => {
    const [fileUpload, setFileUpload] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(value);
    const [active, setActive] = useState('edit');
  

    useEffect(() => {
      // Initialize Firebase app
      if (!firebase.apps.length) {
        firebase.initializeApp({
      apiKey: "AIzaSyB_JXPlMaUL7Ig0iQQs4gM9f5c3jS9ttjY",
      authDomain: "binarybond-1c15f.firebaseapp.com",
      projectId: "binarybond-1c15f",
      storageBucket: "binarybond-1c15f.appspot.com",
      messagingSenderId: "60813047449",
      appId: "1:60813047449:web:8d5aa2b426d9896d78aa08",
      measurementId: "G-LKX4KM371W"
        });
    };
  }, []);


    const photoUpload = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      console.log(file.name)
  
        setFileUpload(file); 
        setImagePreviewUrl(imageUrl);

      

      // Create a unique filename for the uploaded file
    const filename = `${Date.now()}-${file.name}`;
    const storageRef = firebase.storage().ref();

    // Upload the file to Firebase Storage
    const uploadTask = storageRef.child(filename).put(file);

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // Get the upload progress (optional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        // Handle any errors during the upload
        console.error(error);
      },
      () => {
        // Upload completed successfully, get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          handleProfileUrlChange(downloadURL); // Save the download URL to your database
        });
      }
    );
  };

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const activeP = active === 'edit' ? 'profile' : 'edit';
      setActive(activeP);
    };

    const handleProfileUrlChange =(downloadURL) => {
      onChange(downloadURL);
    }
  
  
    return (
      <div>
        {active === 'edit' ? (
          <form onSubmit={handleSubmit}>
            <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
          </form>
        ) : (
          <Profile onSubmit={handleSubmit} src={imagePreviewUrl} />
        )}
      </div>
    );
  };
  
  export default ProfilePic;