import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";
;

const DeletePackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowDeletePopup }) => {
 

const [selectedPackage,setSelectedPackage] = useState(""); 

/******************** LISTOFPACKAGENAMES  ******************************/
// const listOfPackageNames = () => {
    
//     const packageNames =[];
  
//     for (let i=0; i< travelPackage.length; i++){
//        packageNames[i] = travelPackage[i].name;
  
//     }
//     console.log("PackageNames ",packageNames);
//   };

    /*********************  listDeleteTravelPackage *************************/
    const listDeleteTravelPackage = (travelPackage) => {
        const packageOptions = [];
        packageOptions.push(<option>Select Package...</option>);
          
        // if (travelPackage.length >0) {
                for (let i = 0; i < travelPackage.length; i++) {
                packageOptions.push(
                    <option key={travelPackage[i].name} value={travelPackage[i].name}>
                    {travelPackage[i].name}
                    </option>
                );
                
            }
        // } else{
        //      setShowDeletePopup(false);

        // }

        console.log("Package Names", packageOptions);
      
        return packageOptions;
      };

     /*********************  handleDeleteClick *************************/
      const handleDeleteClick= async(event) => {
        event.preventDefault(); // Prevents the default form submission behavior
            
            console.log("Selected Package",selectedPackage);
            if (selectedPackage !== ""){
                const deletePackage = travelPackage.find(packageObj => packageObj.name === selectedPackage);
                console.log("Delete Package ID",deletePackage.id);
                // Calling delete API or function to delete the package
                await APIServices.deleteTravelPackageAPI(deletePackage.id).then(() => {
                    // Update travelPackage state after deletion
                    syncTravelPackages(); 
                })
            }
        // Reset the selection after deletion
            setSelectedPackage("");
            setShowDeletePopup(false);
    
      };
    
      return (
        <div className="deletePopUpMenu">
           <h3>Delete Package</h3>
          <label htmlFor="packageToDelete" style={{ display: 'inline-block' }}>
            
          </label>
          <br></br>
           <select id="packageToDelete" name="packageToDelete" onChange={(e) => {
            console.log("E Target.Value",e.target.value);
           
            setSelectedPackage(e.target.value)}}>
            {listDeleteTravelPackage(travelPackage)}
          </select>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      );
    };
    
    export default DeletePackage;