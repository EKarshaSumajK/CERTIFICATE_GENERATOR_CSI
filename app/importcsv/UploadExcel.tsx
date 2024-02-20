"use client";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { adddata } from "../Commonstuff/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./hid.css";
const UploadExcel = () => {
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userState.data);
  const user = useSelector((state) => state.userState.user);
  const router = useRouter();
  const [allColumns, setAllColumns] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [remainVisible, setRemainVisible] = useState(false);
  const [numberArray, setNumberArray] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range(sheet["!ref"]);
        const columns = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
          const header =
            sheet[XLSX.utils.encode_cell({ r: range.s.r, c: col })].v;
          const columnData = XLSX.utils
            .sheet_to_json(sheet, {
              header: 1,
              range: {
                s: { c: col, r: range.s.r + 1 },
                e: { c: col, r: range.e.r },
              },
              raw: false,
            })
            .flat();
          columns.push({ header, data: columnData });
        }

        setAllColumns(columns);
        setHeaders(columns.map((column) => column.header));
        setNumberArray([...Array(columns[0].data.length).keys()]);
        setRemainVisible(true);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const makeVisible = () => {
    setRemainVisible(true);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  dispatch(adddata(allColumns));

  return (
    <>
      <div>
        <div className="mt-40 max-md:mt-20">
          <div className="flex flex-col	justify-center	items-center	">
            <h1
              style={{ fontWeight: 500 }}
              className="mt-20 text-white text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            >
              Please Import your CSV File Here
            </h1>
            <br />
            <br />
            <br />
            <div className=" top-[35%] bg-transparent borderGradient w-4/5 md:w-5/6 xl:w-full">
              <div
                className="innerBorder grid place-items-center bg-transparent"
                onClick={handleClick}
                id="drop-area"
              >
                <Image
                  width={201}
                  height={201}
                  src="/assets/csvLogo.png"
                  className="bg-transparent"
                  alt=""
                />
                <div className="bg-transparent">
                  <p className="mt-5" id="file-info">
                    Click or Drop your CSV file Here
                  </p>
                  <input
                    className="bg-transparent visuallyhidden"
                    type="file"
                    id="file-input"
                    ref={fileInputRef}
                    accept=".csv"
                    onChange={handleFileUpload}
                  />
                  <div id="error-message" />
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            {remainVisible && (
              <div className=" bottom-[5%] pt-4 pb-4 pl-11 pr-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3]">
                {/* <Link href={'importcertificate'}> */}
                <button
                  type="button"
                  onClick={() => router.push("/importcertificate")}
                >
                  IMPORT YOUR CSV
                </button>
                {/* </Link>  */}
              </div>
            )}
          </div>
          <br />
          <br />
          //{" "}
        </div>
        {remainVisible && (
          <div className="flex justify-center">
            <div
              className="w-[80vw] h-[60vh] rounded overflow-auto p-8"
              style={{
                border: "3px dotted #000",
                background:
                  "linear-gradient(#000 0 0) padding-box,linear-gradient(to right,#58D7FC, #F8FFA3) border-box",
              }}
            >
              <table className="w-full h-full bg-black">
                <thead>
                  <tr className="font-bold text-white text-[30px]">
                    {headers.map((header, index) => (
                      <th key={index} className="m-[40px] p-4 border-1">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {numberArray.map((num) => (
                    <tr
                      key={num}
                      className="font-semibold text-[20px] text-gray-500"
                    >
                      {allColumns.map((column, index) => (
                        <td
                          key={index}
                          className="m-[30px] text-center p-4 border-1"
                        >
                          {column.data[num]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
    </>
  );
};
export default UploadExcel;
