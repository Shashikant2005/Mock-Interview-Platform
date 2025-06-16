// RecordInterview.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio, InfinitySpin, ThreeDots } from 'react-loader-spinner'

const RecordInterview = () => {

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const { id } = useParams()
    const { userId } = useAuth()

    const startRecording = () => {
        setRecording(true);
        setVideoBlob(null)
        const stream = webcamRef.current.stream;

        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        const chunks = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            setVideoBlob(blob);
        };

        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setRecording(false);
        mediaRecorderRef.current.stop();
    };

    const uploadToCloudinary = async () => {
        if (!videoBlob) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('video', videoBlob); // "video" must match the key your backend expects

        try {
            const response = await axios.post(
                'http://localhost:3000/api/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const videoUrl = response.data.url;
            console.log('Cloudinary video URL:', videoUrl);

            //  alert('Video uploaded to Cloudinary!');

            console.log(videoUrl)
            console.log(id)
            console.log(userId)

            // Step 2: Save video URL to your backend
            try {
                const res = await axios.post('http://localhost:3000/api/saveinDb', {
                    videoUrl,
                    userId,
                    mockId: id,
                });
                toast.success('Video Saved Succesfully', {position: "top-right"});
              
            } catch (err) {
                const errorMsg = err.response?.data?.error;
                toast.warning(`Warning : ${errorMsg}`, {position: "top-right"});
                
            }
            // alert('Video URL saved in DB successfully!');
        } catch (err) {
            toast.error('Upload failed', {position: "top-right"});
        } finally {
            setVideoBlob(null)
            setLoading(false);
        }
    };


    return (
        <div className="bg-gray-300 p-4 rounded-xl shadow-md max-w-xl mx-auto"> <ToastContainer />
            <Webcam
                ref={webcamRef}
                mirrored
                audio
                className="rounded-lg mb-4 w-full h-64 object-cover"
            />

            {!loading && <div className="flex flex-col justify-center gap-4">
                {!recording ? (
                    <button
                        onClick={startRecording}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Start Video Recording
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        End Video Recording
                    </button>
                )}

                {videoBlob && !loading && (
                    <>
                        <button
                            onClick={uploadToCloudinary}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                        >
                            Save Video
                        </button>
                        <button
                            onClick={() => setShowPreview(true)}
                            className="bg-violet-400 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                        >
                            Preview Video
                        </button>

                        <button
                            onClick={() => setVideoBlob(null)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                        >
                            Clear Video
                        </button>
                    </>
                )}


            </div>}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-4 shadow-lg w-[90%] max-w-2xl relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                            onClick={() => setShowPreview(false)}
                        >
                            ❌
                        </button>
                        <h2 className="text-xl font-bold mb-4">Recorded Video Preview</h2>
                        <video
                            src={URL.createObjectURL(videoBlob)}
                            controls
                            className="w-full rounded"
                        />
                    </div>
                </div>
            )}
            {
                loading && <div> <ThreeDots
                    visible={true}
                    height="20"
                    width="80"
                    color="#2561be"
                    radius="6"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> </div>
            }
        </div>
    );
};

export default RecordInterview;
