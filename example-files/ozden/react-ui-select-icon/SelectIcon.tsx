/*

Copyright 2023 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

*/

import React, { useState, useEffect, useRef } from 'react';
import './SelectIcon.css';
import arrow from './SelectIcon/arrow.svg';

interface IconType {
  id: any;
  iconFile: any;
  title: string;
}

interface Props {
  icons: IconType[];
  selectedId: any;
  onSelect: (id: any) => void;
  containerWidth?: string;
  containerHeight?: string;
  selectedIconSize?: string;
  itemSize?: string;
  itemIconSize?: string;
  itemsPerRow?: number;
  isAnimated?: boolean;
  overlayColor?: string;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

const SelectIcon: React.FC<Props> = ({
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
}) => {

const mainBoxRef = useRef<HTMLDivElement>(null);
const selectionBoxRef = useRef<HTMLDivElement>(null);

const [selectedIdState, setSelectedIdState] = useState<number>(selectedId);
const [isSelectionOpen, setIsSelectionOpen] = useState<boolean>(false);
const [selectionTop, setSelectionTop] = useState<string>("0px");
const [selectionLeft, setSelectionLeft] = useState<string>("0px");
const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

// Find selected item
const selectedItem = icons.find(item => item.id === selectedIdState);

const animatedCSS = (isAnimated) ? "animated-" : "";

  // Calculate selectionBox left and top.
  useEffect(() => {
  if (selectionBoxRef.current && isSelectionOpen) {

    // Do not cross the screen boundaries:
    const _mainBoxTop = mainBoxRef.current?.offsetTop || 0;
    const _mainBoxLeft = mainBoxRef.current?.offsetLeft || 0;

    let _selectionTop = (((selectionBoxRef.current.clientHeight / 2) - (parseInt(containerHeight) / 2)) * -1) + _mainBoxTop;
    let _selectionLeft = (((selectionBoxRef.current.clientWidth / 2) - (parseInt(containerWidth) / 2)) * -1) + _mainBoxLeft;

    if (_selectionTop < 0) _selectionTop = 0;
    if (_selectionLeft < 0) _selectionLeft = 0;

    const _maxTop = screenHeight - selectionBoxRef.current.clientHeight;
    const _maxLeft = screenWidth - selectionBoxRef.current.clientWidth;

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

  const selectItem = (id: number) => {
    setSelectedIdState(id);
    setIsSelectionOpen(false);
    onSelect(id);
  };

  useEffect(() => {
    setSelectedIdState(selectedId);
  }, [selectedId]);

  // Icon items for selection:
  const items = icons.map((item) => (
    <Item
      key={item.id}
      item={item}
      selectedId={selectedId}
      itemSize={itemSize}
      itemIconSize={itemIconSize}
      selectItem={selectItem}
    />
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

interface MainIconProps {
  selectedItem: IconType;
  selectedIconSize: string;
}

function MainIcon({selectedItem, selectedIconSize}: MainIconProps) {
  return(
    <img
      className="SelectIcon__main-icon"
      alt=""
      src={selectedItem.iconFile}
      style={{width: selectedIconSize, height: selectedIconSize}}
    />
  );
}

interface MainIconArrowProps {
  image: any;
}

function MainIconArrow({image}: MainIconArrowProps) {
  return(
    <img src={image} alt="" className="SelectIcon__arrow-icon" />
  );
}

interface IconTitleProps {
  title: string;
}

function IconTitle({title = ""}: IconTitleProps) {
  return(
    <div className="SelectIcon__title">{title}</div>
  );
}

interface IconProps {
  item: IconType;
  itemIconSize: string;
}

function Icon({item, itemIconSize}: IconProps) {
  return(
    <img
      alt=""
      src={item.iconFile}
      style={{width: itemIconSize, height: itemIconSize}}
    />
  );
}

interface ItemProps {
  item: IconType;
  selectedId: any;
  itemSize: string;
  itemIconSize: string;
  selectItem: any;
}

function Item({item, selectedId, itemSize, itemIconSize, selectItem}: ItemProps) {
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