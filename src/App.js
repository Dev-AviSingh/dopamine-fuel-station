import { useEffect, useState } from 'react';

import './App.css';
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AnimalImageAPIs = {
  "dog":{
    "url": "https://place.dog/"
  },
  "bear":"https://placebear.com/",
  "kitten":"https://placekitten.com/"
}

const TitleBar = (props) => {
  return <div className = "h-2/7 align-middle w-full bg-gray-800 font-mono text-3xl text-white text-left px-5 py-3">
  Dopamine Fuel Station <img src = "Cat Logo.png" className = "w-10 h-10 float-right rounded-full"/>
</div>
}

const AnimalButton = (props) => {
  return <div onClick={() => props.animalUpdater(props.name)}
  className = {`${props.isCurrent?"bg-green-500":""} w-full center border-black px-10 py-5 hover:bg-green-400 active:text-red-500 select-none transition`}>
    {props.name}
  </div>
}

const ImageCard = (props) => {
  return (
      <div className="relative">
        <img src={props.srcurl} alt="" className="w-full h-full object-cover rounded-lg" />
      </div>
  )
}



function App() {
  let [currentAnimal, setCurrentAnimal] = useState("dog")
  let [urls, seturls] = useState([])
  let [maxCount, setMaxCount] = useState(10)

  function generateLinks(animalName, count){
    let newURLS = []
    for(let i = 0; i < count; i++){
      switch(currentAnimal){
        case "dog":
          newURLS.push(`https://place.dog/${getRandomInt(300, 500)}/${getRandomInt(300, 500)}`)
          break
        case "bear":
          //https://placebear.com/g/200/300
          newURLS.push(`https://placebear.com/${getRandomInt(300, 500)}/${getRandomInt(300, 500)}`)
          break
        case "kitten":
          //https://placekitten.com/g/200/300
          newURLS.push(`https://placekitten.com/${getRandomInt(300, 500)}/${getRandomInt(300, 500)}`)
          break
      }
    }
    return newURLS;
  }

  useEffect(() => {
    seturls([...generateLinks(currentAnimal, maxCount)])
  }, [currentAnimal])

  useEffect(() => {
    seturls([...urls,...generateLinks(currentAnimal, maxCount - urls.length)])
  }, [maxCount])

  return (
    <div className="">
      <TitleBar></TitleBar>
      <div className = "text-center absolute w-1/6 right-0 h-full bg-gray-700 top-2/7 text-xl uppercase text-white font-mono text-content ">
        
        {
          Object.keys(AnimalImageAPIs).map((name) => 
          <AnimalButton key = {name} name = {name} animalUpdater = {setCurrentAnimal} isCurrent = {name === currentAnimal}/>
          )
        }
        <br />
        <input id="maxCountInput" className = "inline-block w-20 p-2 m-2  bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         type="number" step = {10} value = {maxCount} onChange={(e) => setMaxCount(e.target.value)}></input>
      </div>
      
      <div className="absolute overflow-y-scroll left-0 top-2/7 h-screen w-5/6 bg-gray-600 px-5 py-5 grid grid-cols-4 gap-4">
        {
          urls.map((url) => 
            <ImageCard srcurl = {url}></ImageCard>
          )
        }
      
      </div>

    </div>
  );
}

export default App;
