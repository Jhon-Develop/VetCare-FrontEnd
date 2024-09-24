import React from "react";
import Trash from "../../assets/Images/Trash-cPurple.png";
import { useNavigate } from "react-router-dom";

const Modal = ({ itemType, itemId, onDeleteSuccess, onCancel }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté definido

    const deleteItem = async () => {
        try {
            let url;
            if (itemType === "Pet") {
                url = `https://vetcare-backend.azurewebsites.net/api/v1/Pet/DeletePet/${itemId}`;
            } else if (itemType === "User") {
                url = `https://vetcare-backend.azurewebsites.net/api/v1/users?id=${itemId}`;
            }

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert(`Error eliminating the ${itemType} successfully removed`);
                navigate("/pets");
                onDeleteSuccess();
            } else {
                alert(`Error eliminating the  ${itemType}`);
            }
        } catch (error) {
            alert(`Error in the deletion request: ${error}`);
        }
    };

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 py-12 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-cPurple rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-cYellow">
                            <img src={Trash} alt="Trash icon" className="w-14 h-14" />
                        </div>
                        <div classNaelme="mt-3 text-center sm:mt-5">
                            <h3 className="text-2xl sm:text-3xl font-medium w-full text-cWhite" id="modal-title">
                                Are you sure you want to delete this {itemType}?
                            </h3>
                            <div className="mt-2 flex flex-col items-center justify-center">
                                <p className="text-base sm:text-lg text-cWhite w-64">
                                    You will not be able to restore it after deleting.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex justify-center gap-x-4">
                        <button
                            type="button"
                            className="w-24 sm:w-32 justify-center rounded-md border border-cYellow shadow-sm px-4 sm:px-8 py-2 bg-cPurple text-base font-MontserratSemibold text-cYellow hover:scale-105"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="w-24 sm:w-32 justify-center rounded-md border border-transparent shadow-sm px-4 sm:px-8 py-2 bg-cYellow text-base font-MontserratSemibold text-cPurple hover:scale-105"
                            onClick={deleteItem}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
