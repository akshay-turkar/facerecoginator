import React, {useState} from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecoginition from './components/facerecoginition/FaceRecoginition';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';

const app = new Clarifai.App({
  apiKey: 'b5622532cb4e4eba8d888a523933e17e'
 });

 ///******************************

function App() { 


  const [input, SetInput] = useState()
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [signedIn, setSignedIn] = useState()
  const [route, setRoute] = useState('signin')
  const [user, setUser] = useState({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: new Date()
  })

  const loadUser = ( user ) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    })
  }

  const calculateFaceLoaction = (data) => {

    const faceData = data.outputs[0].data.regions;
    
      const clarifaiFace = faceData[0].region_info.bounding_box
      const image = document.getElementById("inputimage")
      const width = Number(image.width)
      const height = Number(image.height)

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    
  }
  
  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {

    SetInput(event.target.value)

  }

  const onPictureSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      // go to clrifiy npm the to github repo then to src then to index.js to try the diffrent models
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id
            })
          }).then(response => response.json())
          .then(count => {
            setUser(Object.assign(user, {entries: count}))
          })
        }
        displayFaceBox(calculateFaceLoaction(response))

      })
      .catch(err => console.log(err))
  }

  
  const onRouteChange = (route) => {
    if(route === 'signout'){
      setSignedIn(false)
    }
    else if (route === 'home') {
      setSignedIn(true)
    }
    setRoute(route)
    
  }
  


  return (
    <div className="App">
        <Navigation isSignedIn = {signedIn}
        onRouteChange={onRouteChange}
        />
      
      
      {route === 'home'
        ?<div>
          <Logo />
          <Rank name = {user.name}
          entries = {user.entries} />
          <ImageLinkForm 
          onInputChange = {onInputChange} 
          onPictureSubmit = {onPictureSubmit}
          />
          <FaceRecoginition imageUrl = {imageUrl} box = {box}/>
        </div>  
      :(
        route === 'signin'
        ? <SignIn loadUser = {loadUser}
        onRouteChange={onRouteChange}/>
        : <Register loadUser = {loadUser}
        onRouteChange={onRouteChange}/>
      )
    }
   </div>
  );
}

export default App;
