/*

Copyright 2023 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

*/

import React, { useState, useEffect, useRef } from 'react';
import './SelectIcon.css';
import arrow from './SelectIcon/arrow.svg';

function SelectIcon({
  icons = [],
  selectedId = -1,
  onSelect = function() {},
  containerWidth = '100px',
  containerHeight = '90px',
  selectedIconSize = '64px',
  itemSize = '90px',
  itemIconSize = '64px',
  itemsPerRow = 4,
  isAnimated = true,
  overlayColor = 'rgba(0, 0, 0, 0.1)',
  containerStyle = {},
  containerClassName = '',
}) {

  const mainBoxRef = useRef(null);
  const selectionBoxRef = useRef(null);

  const [selectedIdState, setSelectedIdState] = useState(selectedId);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [selectionTop, setSelectionTop] = useState("0px");
  const [selectionLeft, setSelectionLeft] = useState("0px");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Find selected item
  const selectedItem = icons.find(item => item.id == selectedIdState);

  const animatedCSS = (isAnimated) ? "animated-" : "";

  // Calculate selectionBox left and top.
  useEffect(function() {
    if (selectionBoxRef.current && isSelectionOpen) {

      // Do not cross the screen boundaries:
      const _mainBoxTop = mainBoxRef.current.offsetTop;
      const _mainBoxLeft = mainBoxRef.current.offsetLeft;

      let _selectionTop = (((selectionBoxRef.current.clientHeight / 2) - (parseInt(containerHeight) / 2)) * -1) + _mainBoxTop;
      let _selectionLeft = (((selectionBoxRef.current.clientWidth / 2) - (parseInt(containerWidth) / 2)) * -1) + _mainBoxLeft;

      if (_selectionTop < 0) _selectionTop = 0;
      if (_selectionLeft < 0) _selectionLeft = 0;

      const _maxTop = screenHeight - selectionBoxRef.current.innerHeight;
      const _maxLeft = screenWidth - selectionBoxRef.current.innerWidth;

      if (_selectionTop > _maxTop) _selectionTop = _maxTop;
      if (_selectionLeft > _maxLeft) _selectionLeft = _maxLeft;

      setSelectionTop(_selectionTop + "px");
      setSelectionLeft(_selectionLeft + "px");
       
    }
  }, [containerWidth, containerHeight, isSelectionOpen, screenWidth, screenHeight]); 

  // On screen resize:
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const mainItemClicked = () => {
    setIsSelectionOpen(!isSelectionOpen);
  };

  const selectItem = (id) => {
    setSelectedIdState(id);
    setIsSelectionOpen(false);
    onSelect(id);
  };

  useEffect(() => {
    setSelectedIdState(selectedId);
  }, [selectedId]);

  // Icon items for selection:
  const items = icons.map((item) => (
    <Item key={item.id} item={item} selectedId={selectedIdState} itemSize={itemSize} itemIconSize={itemIconSize} selectItem={selectItem}/>
  ));

  return (
    <div style={containerStyle} className={containerClassName} >

      <div className={(isSelectionOpen) ? 
        `SelectIcon__selection-cover-background ${animatedCSS}show` : 
        `SelectIcon__selection-cover-background ${animatedCSS}hide`}
        onClick={mainItemClicked} 
        style={{backgroundColor: overlayColor}}
      > 

        <div
          ref={selectionBoxRef}
          className={(isSelectionOpen) ? `SelectIcon__selection-box ${animatedCSS}show` : `SelectIcon__selection-box ${animatedCSS}hide`}
          style={{
            left: selectionLeft,
            top: selectionTop,
            gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
          }}
        >
          {items && (items)}
        </div>

      </div>

      <div
        ref={mainBoxRef} 
        className="SelectIcon__main-box"
        onClick={mainItemClicked}
        style={{width:containerWidth, height:containerHeight}}
      >
        {selectedItem && (<MainIcon selectedItem={selectedItem} selectedIconSize={selectedIconSize} />)}
        {selectedItem?.title && (<IconTitle title={selectedItem.title}/>)}
        <MainIconArrow image={arrow} />
      </div>

    </div>
  );
}

function MainIcon({selectedItem, selectedIconSize}) {
  return(
    <img
      className="SelectIcon__main-icon"
      alt=""
      src={selectedItem.iconFile}
      style={{width: selectedIconSize, height: selectedIconSize}}
    />
  );
}

function MainIconArrow({image}) {
  return(
    <img src={image} alt="" className="SelectIcon__arrow-icon" />
  );
}

function IconTitle({title = ""}) {
  return(
    <div className="SelectIcon__title">{title}</div>
  );
}

function Icon({item, itemIconSize}) {
  return(
    <img
      alt=""
      src={item.iconFile}
      style={{width: itemIconSize, height: itemIconSize}}
    />
  );
}

function Item({item, selectedId, itemSize, itemIconSize, selectItem}) {
  return(
    <div 
    className={(item.id !== selectedId) ? "SelectIcon__item" : "SelectIcon__item selected"}
    onClick={() => selectItem(item.id)}
    style={{
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      width: itemSize, 
      height: itemSize,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Icon item={item} itemIconSize={itemIconSize} />
      {item?.title && (<IconTitle title={item.title}/>)}
    </div>
  );
}

export default SelectIcon;