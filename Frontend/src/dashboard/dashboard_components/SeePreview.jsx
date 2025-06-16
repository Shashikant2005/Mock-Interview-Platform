import React from 'react'
import useJobStore from '../../store';

function SeePreview() {
    const { setSeevideo, Seevideo, video, setVideo } = useJobStore();
    return (
        <div>
            {video ? (<div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl p-4 shadow-lg w-[90%] max-w-2xl relative">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        onClick={() => {setSeevideo(false) ; setVideo('')}}
                    >
                        ❌
                    </button>
                    <h2 className="text-xl font-bold mb-4">Recorded Video Preview</h2>
                    <video
                        src={video}
                        controls
                        className="w-full rounded"
                    />
                </div>
            </div>):<div></div>
            }
        </div>
    )
}

export default SeePreview