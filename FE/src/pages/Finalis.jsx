
import { useState, useEffect, Fragment } from "react";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import "./loading.css";

const Finalis = () => {
     const ambilUser = useSelector((state) => state.user);
     const tokenne = ambilUser.user?.token;

     const [files, setFiles] = useState({
          Proposal: null,
          Dokumen_Substansi: null,
          Pernyataan_Originalitas: null,
     });

     const [isVerified, setIsVerified] = useState(null);
     const [uploadSuccess, setUploadSuccess] = useState(false);
     const [registerData, setRegisterData] = useState(null);
     const [isLoading, setIsLoading] = useState(false);
 
     const getRegister = async () => {
         if (!tokenne) {
             console.error("Token tidak tersedia, silakan login kembali.");
             return;
         }
 
         try {
             setIsLoading(true);
             const response = await fetch(
                 `${import.meta.env.VITE_DB_API_URL}api/register/single`,
                 {
                     method: "GET",
                     headers: {
                         Authorization: `Bearer ${tokenne}`,
                     },
                 }
             );
 
             const result = await response.json();
             console.log(result);
             
             if (response.ok) {
                 setRegisterData(result);
                 if(result.status_Registrasi === 4){
                     setIsVerified(true);
                 }
             } else {
                 console.error("Error fetching register data:", result.message);
                 alert("Gagal menampilkan data registrasi: " + result.message);
             }
         } catch (error) {
             console.error("Error during register request:", error);
             alert("Terjadi kesalahan saat menampilkan data registrasi.");
         } finally {
             setIsLoading(false);
         }
     };
 
     useEffect(() => {
         getRegister();
     }, []);

     const handleFileChange = (e) => {
          setFiles({
               ...files,
               [e.target.name]: e.target.files[0],
          });
     };

     const handleSubmitFinalis = async (e) => {
          e.preventDefault();

          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          setIsLoading(true);

          const formData = new FormData();
          formData.append("Proposal", files.Proposal);
          formData.append("Dokumen_Substansi", files.Dokumen_Substansi);
          formData.append(
               "Pernyataan_Originalitas",
               files.Pernyataan_Originalitas
          );

          try {
               const response = await fetch(
                    `${import.meta.env.VITE_DB_API_URL}api/competitions/upload`,
                    {
                         method: "POST",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                         body: formData,
                    }
               );

               const result = await response.json();

               if (response.ok) {
                    console.log("Documents uploaded successfully:", result);
                    alert("Dokumen berhasil diunggah.");
                    setUploadSuccess(true);
                    setFiles({
                         Proposal: null,
                         Dokumen_Substansi: null,
                         Pernyataan_Originalitas: null,
                    });
               } else {
                    console.error("Error uploading documents:", result.message);
                    alert("Gagal mengunggah dokumen: " + result.message);
               }
          } catch (error) {
               console.error("Error during document upload:", error);
               alert("Terjadi kesalahan saat mengunggah dokumen.");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <Fragment>
               <div className="container mt-5">
                    <h1 className="text-center mb-4 text-white bg-[#222725] p-4 rounded-md">
                         Upload Dokumen Finalis
                    </h1>

                    {isLoading  ? (
                         <div className="alert alert-info text-white bg-[#222725] p-4 rounded-md">
                              Memeriksa status registrasi...
                         </div>
                    ) : isVerified ? (
                         <div className="alert alert-success text-white bg-[#222725] p-4 rounded-md">
                              document sudah di upload
                         </div>
                    ) : (
                         <div className="alert alert-warning text-white bg-[#222725] p-4 rounded-md">
                              tolong Upload document Di bawah
                         </div>
                    )}

                    {uploadSuccess && (
                         <div className="alert alert-info text-white bg-[#222725] p-4 rounded-md">
                              Dokumen Anda berhasil diunggah.
                         </div>
                    )}

                    <form
                         onSubmit={handleSubmitFinalis}
                         className="p-4 shadow-sm rounded-md bg-light bg-[#222725] mt-4">
                         <div className="form-group mb-3 flex items-center">
                              <p className="form-label text-white w-1/5">Dokumen Finalis</p>
                              <input
                                   type="file"
                                   name="Proposal"
                                   onChange={handleFileChange}
                                   className="form-control w-max bg-[#E4E6C3] rounded-md p-2"
                                   value={files.Proposal ? undefined : ""}
                                   disabled={isVerified}
                              />
                         </div>
                         <button
                              type="submit"
                              className={`${isVerified ? 'hidden' : 'block'} btn btn-primary w-100 bg-[#E4E6C3] p-2 rounded-md px-4`}
                              disabled={isVerified}>
                              Upload
                         </button>
                    </form>

                    {isLoading && (
                         <div className="loading-overlay">
                              <div className="spinner"></div>
                         </div>
                    )}
               </div>
          </Fragment>
     );
};

export default Finalis;