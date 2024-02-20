"use client";
import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CloseIcon from "./close.svg";
import EditIcon from "./edit.svg";
import { useEffect } from "react";
const ImageUploadComponent = () => {
  const [textInputs, setTextInputs] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);

  const imageContainerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const data = useSelector((state) => state.userState.data);
  const user = useSelector((state) => state.userState.user);
  const router = useRouter();
  const image = useSelector((state) => state.userState.image);
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    if (data.length > 0) {
      setDataInputs(
        Array(data.length).fill({
          text: "",
          size: "",
          fontfam: "",
          colour: "",
          position: { x: 0, y: 0 },
        })
      );
    }
  }, [data]);
  const handleDrag = (e, ui, index) => {
    const newInputs = [...textInputs];
    newInputs[index].position = {
      x: newInputs[index].position.x + ui.deltaX,
      y: newInputs[index].position.y + ui.deltaY,
    };
    setTextInputs(newInputs);
  };

  const handleDataDrag = (e, ui, index) => {
    const newDataInputs = [...dataInputs];
    newDataInputs[index].position = {
      x: newDataInputs[index].position.x + ui.deltaX,
      y: newDataInputs[index].position.y + ui.deltaY,
    };
    setDataInputs(newDataInputs);
  };
  const addTextInput = () => {
    setTextInputs([
      ...textInputs,
      {
        text: "",
        size: "",
        fontfam: "",
        color: "",
        position: { x: 0, y: 0 },
        bold: false,
        italic: false,
        underlined: false,
      },
    ]);
  };

  const addDataInput = () => {
    setDataInputs([
      ...dataInputs,
      {
        text: "",
        size: "",
        fontfam: "",
        color: "",
        position: { x: 0, y: 0 },
        bold: false,
        italic: false,
        underlined: false,
      },
    ]);
  };

  const removeTextInput = (index) => {
    const newInputs = [...textInputs];
    newInputs.splice(index, 1);
    setTextInputs(newInputs);
  };

  const removeDataInput = (index) => {
    const newDataInputs = [...dataInputs];
    newDataInputs.splice(index, 1);
    setDataInputs(newDataInputs);
  };

  const downloadAsImage = () => {
    html2canvas(imageContainerRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "image_with_text.png";
      link.click();
    });
  };
  const [textString, setTextString] = useState(
    isVisible ? CloseIcon : EditIcon
  );

  const showEdit = () => {
    setIsVisible(!isVisible);

    setTextString(isVisible ? EditIcon : CloseIcon);
  };

  const downloadAllImages = async () => {
    var h1 = document.querySelectorAll(".inp");
    var imgs = document.querySelector(".images");

    for (var j = 0; j < data[0].data.length; j++) {
      const promises = [];

      let imageDownloaded = false;

      for (var i = 0; i < data.length; i++) {
        // Loop through the arrays
        const item = data[i];
        const info = item.data;
        const heading = item.header;

        const content = info[j];

        const hElement = document.getElementById(heading);
        if (hElement && hElement.innerHTML.trim() !== "") {
          hElement.innerHTML = content;

          if (!imageDownloaded) {
            const promise = new Promise((resolve) => {
              setTimeout(() => {
                const imageContainer = imageContainerRef.current;
                html2canvas(imageContainer, {
                  scale: 4,
                }).then((canvas) => {
                  const imgData = canvas.toDataURL("image/png");

                  const link = document.createElement("a");
                  link.href = imgData;
                  link.download = `certificate_${i}_${j}.png`;
                  link.click();

                  resolve();
                });
              }, 300);
            });

            promises.push(promise);
            imageDownloaded = true;
          }
        }
      }

      await Promise.all(promises);
    }
  };

  const elementWidthRefs = useRef([]);

  useEffect(() => {
    elementWidthRefs.current = [];
  }, [dataInputs]);
  var backImg =
    Image === null
      ? null
      : Image instanceof Blob
      ? URL.createObjectURL(Image)
      : "";

  return (
    <div className="overflow-y-hidden ">
      <div className="flex flex-row max-md:flex-col max-md:gap-4 max-md:mt-40  justify-between items-center h-[100vh]  overflow-hidden  ">
        <div
          className="flex flex-col     justify-center items-center"
          ref={imageContainerRef}
        >
          {image === null ? null : (
            <img
              src={image instanceof Blob ? URL.createObjectURL(image) : ""}
              alt="Uploaded"
              className="w-[70%] images max-md:w-[90%]"
              style={{ zIndex: -1 }}
            />
          )}

          <div className="absolute bottom-10">
            {dataInputs.map((item, index) => (
              <Draggable
                key={index}
                onDrag={(e, ui) => handleDataDrag(e, ui, index)}
                defaultPosition={{ x: 0, y: 0 }}
                className="text-white"
              >
                <h1
                  style={{
                    fontSize: `${item.size}px`,
                    fontFamily: `${item.fontfam}`,
                    color: `${item.color}`,
                    fontWeight: item.bold ? "bold" : "normal",
                    fontStyle: item.italic ? "italic" : "normal",
                    textDecoration: item.underlined ? "underline" : "none",
                    display: "inline-block",
                    width: "100%",
                    whiteSpace: "nowrap",
                  }}
                  id={`${data[index].header}`}
                  ref={(element) => {
                    if (element) {
                      const width = element.getBoundingClientRect().width;
                      elementWidthRefs.current[index] = width;
                      const maxWidth = Math.max(...elementWidthRefs.current);
                      element.style.width = `${maxWidth}px`;
                    }
                  }}
                  className="textfield inp"
                >
                  {item.text}
                </h1>
              </Draggable>
            ))}

            {textInputs.map((input, index) => (
              <Draggable
                onDrag={(e, ui) => handleDrag(e, ui, index)}
                defaultPosition={input.position}
                className="text-white"
                key={index + 1}
              >
                <h1
                  style={{
                    fontSize: `${input.size}px`,
                    fontFamily: `${input.fontfam}`,
                    color: `${input.colour}`,
                    fontWeight: input.bold ? "bold" : "normal",
                    fontStyle: input.italic ? "italic" : "normal",
                    textDecoration: input.underlined ? "underline" : "none",
                    width: "fit-content",
                    display: "inline-block",
                  }}
                  ref={(element) => {
                    if (element) {
                      const width = element.getBoundingClientRect().width;
                      elementWidthRefs.current[index] = width;
                      const maxWidth = Math.max(...elementWidthRefs.current);
                      element.style.width = `${maxWidth}px`;
                    }
                  }}
                >
                  {input.text}
                </h1>
              </Draggable>
            ))}
          </div>
        </div>
        <div
          className="flex w-[fit] max-md:w-[100%] max-md:absolute max-md:bottom-0 max-md:h-[100%] lg:h-[100vh] bg-black flex-col max-md:h-[50vh] max-md:mt-20 max-md:absolute max-md:bottom-0    overflow-auto"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <div className="flex w-[fit] h-[80vh] bg-black flex-col  overflow-auto overflow-x-hidden p-2">
            {data.length > 0 && (
              <div className="p-2">
                {data.map((item, index) => (
                  <div key={index}>
                    <h1 className="text-white text-2xl">
                      &#x25cf; {item.header}
                    </h1>
                    <br />
                    <div className="relative ">
                      <input
                        type="text"
                        name="floating_outlined"
                        value={item.text}
                        onChange={(e) => {
                          const newInputs = [...dataInputs];
                          newInputs[index] = {
                            ...newInputs[index],
                            text: e.target.value,
                          };
                          setDataInputs(newInputs);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          border: "1px dotted transparent",
                          background:
                            "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                        }}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg text-white p-1 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[300px] h-[60px]"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Sample Text
                      </label>
                    </div>
                    <br></br>
                    <div className="relative">
                      <input
                        type="text"
                        name="font"
                        value={item.fontFam}
                        onChange={(e) => {
                          const newInputs = [...dataInputs];
                          newInputs[index] = {
                            ...newInputs[index],
                            fontFam: e.target.value,
                          };
                          setDataInputs(newInputs);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          border: "1px dotted transparent",
                          background:
                            "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                        }}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg text-white p-1 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[300px] h-[60px]"
                        placeholder=" "
                      />
                      <label
                        htmlFor="font"
                        className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Font
                      </label>
                    </div>
                    <br></br>
                    <div className="flex gap-5">
                      <div className="relative">
                        <input
                          type="text"
                          name="size"
                          value={item.size}
                          onChange={(e) => {
                            const newInputs = [...dataInputs];
                            newInputs[index] = {
                              ...newInputs[index],
                              size: e.target.value,
                            };
                            setDataInputs(newInputs);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            border: "1px dotted transparent",
                            background:
                              "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                          }}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg text-white p-1 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[150px] h-[60px]"
                          placeholder=" "
                        />
                        <label
                          htmlFor="size"
                          className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Size
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="color"
                          value={item.color}
                          onChange={(e) => {
                            const newInputs = [...dataInputs];
                            newInputs[index] = {
                              ...newInputs[index],
                              color: e.target.value,
                            };
                            setDataInputs(newInputs);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            border: "1px dotted transparent",
                            background:
                              "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                          }}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg text-white p-1 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[150px] h-[60px]"
                          placeholder=" "
                        />
                        <label
                          htmlFor="color"
                          className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Color
                        </label>
                      </div>
                    </div>

                    <div>
                      <div
                        className="bg-black text-sm text-white top-3 left-4 p-1"
                        style={{
                          position: "relative",
                          zIndex: 1,
                          display: "inline-block",
                        }}
                      >
                        Decorate
                      </div>
                      <div
                        className="relative flex gap-2 px-4 py-4 rounded-lg w-[150px] justify-center"
                        style={{
                          border: "1px dotted transparent",
                          background:
                            "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                        }}
                      >
                        <label>
                          <button
                            style={{
                              border: "1px solid gray",
                            }}
                            className="text-white px-2 py-1"
                            active={item.bold}
                            onClick={() => {
                              const newInputs = [...dataInputs];
                              newInputs[index] = {
                                ...newInputs[index],
                                bold: !newInputs[index]?.bold,
                              };
                              setDataInputs(newInputs);
                            }}
                          >
                            <strong>B</strong>
                          </button>
                        </label>
                        <label>
                          <button
                            style={{
                              border: "1px solid gray  ",
                            }}
                            active={item.italic}
                            className="text-white px-2 py-1"
                            onClick={() => {
                              const newInputs = [...dataInputs];
                              newInputs[index] = {
                                ...newInputs[index],
                                italic: !newInputs[index]?.italic,
                              };
                              setDataInputs(newInputs);
                            }}
                          >
                            𝑰
                          </button>
                        </label>
                        <label>
                          <button
                            style={{
                              border: "1px solid gray",
                            }}
                            active={item.underlined}
                            className="text-white px-2 py-1"
                            onClick={() => {
                              const newInputs = [...dataInputs];
                              newInputs[index] = {
                                ...newInputs[index],
                                underlined: !newInputs[index]?.underlined,
                              };
                              setDataInputs(newInputs);
                            }}
                          >
                            <u>U</u>
                          </button>
                        </label>
                      </div>

                      <br></br>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {textInputs.map((input, index) => (
              <>
                {" "}
                <br></br>
                <div className="flex gap-40 items-center" key={index}>
                  <h1 className="text-white text-2xl  ">
                    &#x25cf; Field {index + 1}
                  </h1>
                  <button
                    onClick={() => removeTextInput(index)}
                    className="rounded-lg bg-red-500	 p-2 flex gap-2 text-white items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      wNameth="16"
                      height="16"
                      fill="white"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                    <p>Delete</p>
                  </button>
                </div>
                <div key={index} className="flex flex-col px-2">
                  <br></br>
                  <div className="relative">
                    <input
                      type="text"
                      Name="floating_outlined"
                      value={input.text}
                      style={{
                        border: "1px dotted transparent",
                        background:
                          "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                      }}
                      onChange={(e) => {
                        const newInputs = [...textInputs];
                        newInputs[index].text = e.target.value;
                        setTextInputs(newInputs);
                      }}
                      class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg    text-white p-1 appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  w-[300px] h-[60px]  "
                      placeholder=" "
                    />
                    <label
                      for="floating_outlined"
                      class="absolute text-sm  text-white   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Sample Text
                    </label>
                  </div>
                  <br></br>
                  <div className="relative">
                    <input
                      type="text"
                      Name="font"
                      value={input.fontfam}
                      style={{
                        border: "1px dotted transparent",
                        background:
                          "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                      }}
                      onChange={(e) => {
                        const newInputs = [...textInputs];
                        newInputs[index].fontfam = e.target.value;
                        setTextInputs(newInputs);
                      }}
                      class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg   text-white p-1 appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  w-[300px] h-[60px]  "
                      placeholder=" "
                    />
                    <label
                      for="font"
                      class="absolute text-sm  text-white   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Font
                    </label>
                  </div>

                  <br></br>
                  <div className="flex gap-5">
                    <div className="relative">
                      <input
                        type="text"
                        Name="size"
                        value={input.size}
                        style={{
                          border: "1px dotted transparent",
                          background:
                            "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                        }}
                        onChange={(e) => {
                          const newInputs = [...textInputs];
                          newInputs[index].size = e.target.value;
                          setTextInputs(newInputs);
                        }}
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg    text-white p-1 appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer   w-[150px] h-[60px]  "
                        placeholder=" "
                      />
                      <label
                        for="size"
                        class="absolute text-sm  text-white   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Size
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        Name="color"
                        value={input.colour}
                        style={{
                          border: "1px dotted transparent",
                          background:
                            "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                        }}
                        onChange={(e) => {
                          const newInputs = [...textInputs];
                          newInputs[index].colour = e.target.value;
                          setTextInputs(newInputs);
                        }}
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg    text-white p-1 appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer   w-[150px] h-[60px]  "
                        placeholder=" "
                      />
                      <label
                        for="color"
                        class="absolute text-sm  text-white   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Color
                      </label>
                    </div>
                  </div>
                  <div>
                    <div
                      className="bg-black text-sm text-white top-3 left-4 p-1"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "inline-block",
                      }}
                    >
                      Decorate
                    </div>
                    <div
                      className="relative flex gap-2 px-4 py-4 rounded-lg w-[150px] justify-center"
                      style={{
                        border: "1px dotted transparent",
                        background:
                          "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
                      }}
                    >
                      <label>
                        <button
                          style={{
                            border: "1px solid gray",
                          }}
                          className="text-white px-2 py-1"
                          active={input.bold}
                          onClick={() => {
                            const newInputs = [...textInputs];
                            newInputs[index] = {
                              ...newInputs[index],
                              bold: !newInputs[index]?.bold,
                            };
                            setTextInputs(newInputs);
                          }}
                        >
                          <strong>B</strong>
                        </button>
                      </label>
                      <label>
                        <button
                          style={{
                            border: "1px solid gray  ",
                          }}
                          active={input.italic}
                          className="text-white px-2 py-1"
                          onClick={() => {
                            const newInputs = [...textInputs];
                            newInputs[index] = {
                              ...newInputs[index],
                              italic: !newInputs[index]?.italic,
                            };
                            setTextInputs(newInputs);
                          }}
                        >
                          𝑰
                        </button>
                      </label>
                      <label>
                        <button
                          style={{
                            border: "1px solid gray",
                          }}
                          active={input.underlined}
                          className="text-white px-2 py-1"
                          onClick={() => {
                            const newInputs = [...textInputs];
                            newInputs[index] = {
                              ...newInputs[index],
                              underlined: !newInputs[index]?.underlined,
                            };
                            setTextInputs(newInputs);
                          }}
                        >
                          <u>U</u>
                        </button>
                      </label>
                    </div>

                    <br></br>
                  </div>
                </div>
                <br></br>
              </>
            ))}
            <div className="flex flex-col items-center p-1">
              <br></br>
              <button
                onClick={addTextInput}
                className="bottom-[5%] left-[40vw] m-[5px] pt-4 pb-4 mb-4  rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-center w-[300px]"
              >
                Add a Field
              </button>
              <button
                onClick={downloadAsImage}
                className="bottom-[5%] left-[40vw] m-[5px] pt-4 pb-4 mb-4 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] w-[300px]"
              >
                Download Sample
              </button>
              <button
                onClick={downloadAllImages}
                className="bottom-[5%] left-[40vw] m-[5px] pt-4 pb-4 mb-4  rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] w-[300px]"
              >
                Download Certificates
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={showEdit}
          title={isVisible ? "Close Button" : "Edit Button"}
          className="absolute  right-[100px]  bottom-10    text-white p-2 rounded-full  "
          style={{
            border: "2px dotted transparent",
            background:
              "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
          }}
        >
          <img src={textString.src} className="w-[40px] h-[40px]"></img>
        </button>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
