# Select Icon - React UI Component for Icon Selection
Select Icon is a React component that provides an easy and customizable way to select icons from a collection.

<b>Live Demo:</b>
https://bug7a.github.io/react-ui-select-icon/

<b>Features:</b>

- JSON data-driven<br>
- Animation support<br>
- Supports both JSX and TypeScript versions<br>

<b>Note:</b>

- This component requires React version 16.8 or higher.<br>
<br>

<b>Package Includes:</b>

- Guide.pdf<br>
- /example-files/App.js<br>
- /example-files/assets/*.png<br>
- /example-files/ozden/react-ui-select-icon/SelectIcon.jsx<br>
- /example-files/ozden/react-ui-select-icon/SelectIcon.tsx<br>
- /example-files/ozden/react-ui-select-icon/SelectIcon.css<br>
- /example-files/ozden/react-ui-select-icon/SelectIcon/arrow.svg<br>


<b>Basic Code Example:</b>

<code>
import SelectIcon from './ozden/react-ui-select-icon/SelectIcon';

const [icons, setIcons] = useState([
    { id: "1", iconFile: images['./cat1.png'], title:"Tree" },
    { id: "2", iconFile: images['./cat2.png'], title: "" },
    { id: "3", iconFile: images['./cat3.png'], title: "Paris" },
  ]);

function App() {
  const handleSelect = (id) => {
    console.log(`Selected icon id: ${id}`);
  }
  return (
    <SelectIcon 
      icons={icons} 
      selectedId="1"
      onSelect={handleSelect}
    />
  );
}
</code>

Tags:

react component, icon selector, icon picker, icon selection, UI component, user interface, web development, front-end development, frontend development, customizable, animation, animated, dropdown, Material UI