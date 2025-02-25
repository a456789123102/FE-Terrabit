'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Trash2, Upload } from 'lucide-react';

function SlipSection({ order, isModalOpen, handleImageClick, handleModalClose, handleUploadSlip, handleClearSlipImage }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Unsupported file type. Please upload a JPEG or PNG image.';
    }
    if (file.size > maxSize) {
      return 'File size exceeds 5MB limit. Please upload a smaller file.';
    }
    return null; // File is valid
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
      } else {
        setErrorMessage(null);
        setSelectedFile(file);
      }
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {/* ข้อความแสดงสถานะ */}
      {order.slipUrl ? (
        <div className="text-green-700 text-[1.1rem] mb-2 font-bold">Your Payment Slip:</div>
      ) : (
        <div className="text-red-700 text-[1.1rem] mb-2 font-bold">Upload Your payment slip:</div>
      )}

      {/* อัพสลิป */}
      {order.status === "pending_payment_proof" && !order.slipUrl && (
        <div className="flex flex-col gap-2 text-[0.7rem] text-slate-700">
          <input
            type="file"
            placeholder="Slip Image"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          {selectedFile && (
            <div className="flex flex-col items-start gap-2">
              <div>Selected File: {selectedFile.name}</div>
              <div className="px-4 py-2 bg-blue-500 text-white rounded-[4px] cursor-pointer hover:bg-blue-700 self-center flex flex-row gap-1 items-center" onClick={() => handleUploadSlip(order.id, selectedFile)} >
                <Upload size={13}/>
                <div>   Upload</div>
              </div>
            </div>
          )}
        </div>
      )}
      {order.slipUrl && (
        <div className="flex flex-col w-full justify-center gap-4 items-center">
  <Image
    src={order.slipUrl}
    alt="Slip"
    width={100}
    height={100}
    className="cursor-pointer"
    onClick={handleImageClick}
  />
  
  {(order.status === "pending_payment_proof" || order.status === "pending_payment_verification") && (
    <div className="flex items-baseline">
      <div 
        className="flex items-center gap-1 px-3 py-2 text-[0.8rem] text-white bg-red-500 hover:bg-red-600 rounded-[4px] cursor-pointer"
        onClick={() => { handleClearSlipImage(order.id, order.status) }}
      >
        <Trash2 size={14} />
        <span>Delete</span>
      </div>
    </div>
  )}
</div>

      )}

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleModalClose} // คลิกนอก Modal เพื่อปิด
        >
          <div className="relative p-10 px-20">
            {/* รูปภาพขยาย */}
            <Image
              src={order.slipUrl}
              alt="Slip Enlarged"
              width={500}
              height={500}
            />
            {/* ปุ่มปิด */}
            <button
              className="absolute top-10 right-0 text-white bg-red-600 px-2 py-1 rounded"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlipSection;
