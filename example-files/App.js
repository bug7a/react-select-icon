import { useState } from 'react';

import './App.css';
import SelectIcon from './ozden/react-ui-select-icon/SelectIcon.jsx';

const images = importAll(require.context('./assets/', false, /\.(png|jpe?g|svg)$/));

function App() {

  const [icons, setIcons] = useState([
    { id: "1", iconFile: images['./cat1.png'], title:"Tree" },
    { id: "2", iconFile: images['./cat2.png'], title: "" },
    { id: "3", iconFile: images['./cat3.png'], title: "Paris" },
    { id: "4", iconFile: images['./cat4.png'], title: "" },
    { id: "5", iconFile: images['./cat5.png'], title: "" },
    { id: "6", iconFile: images['./cat6.png'], title: "" },
    { id: "7", iconFile: images['./cat7.png'], title: "" },
    { id: "8", iconFile: images['./cat8.png'], title: "Flower" },
    { id: "9", iconFile: images['./cat9.png'], title: "" },
    { id: "10", iconFile: images['./cat10.png'], title: "" },
    { id: "11", iconFile: images['./cat11.png'], title: "Egg" },
    { id: "12", iconFile: images['./cat12.png'], title: "" },
    { id: "13", iconFile: images['./cat13.png'], title: "Pink" },
  ]);
  const [selectedIconId, setSelectedIconId] = useState("11");

  const handleIconSelection = (id) => {
    console.log(id);
  }

  return (
    <div className="App" style={{display:'flex', height:'100vh', justifyContent: 'center', alignItems: 'center'}}>
      <SelectIcon
        icons={icons}
        selectedId={selectedIconId}
        onSelect={handleIconSelection}
        containerWidth="100px"
        containerHeight="90px"
        selectedIconSize="64px"
        itemSize="90px"
        itemIconSize="64px"
        itemsPerRow={4}
        isAnimated={true}
        overlayColor='rgba(0, 0, 0, 0.1)'
        //containerStyle={{ position:'absolute', left:'20px', top: '20px' }}
        //containerClassName=''
      />
    </div>
  );
}

function importAll(r) {
  const images = {};
  r.keys().forEach((key) => {
    images[key] = r(key);
  });
  
  // Return the images object
  return images;
}

export default App;
