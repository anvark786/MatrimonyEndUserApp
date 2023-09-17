// import React, { useEffect } from 'react';
// import './ManageSocial.css'; // Import CSS file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFacebookSquare,
//   faTwitterSquare,
//   faInstagram,
//   faLinkedin,
//   faWhatsapp,
//   faYoutube
//   // Add more social media icons as needed
// } from '@fortawesome/free-brands-svg-icons';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// const ManageSocial = (
//   { socialLinks,
//     newPlatform,
//     newLink,
//     setNewPlatform,
//     handleAddLink,
//     handleEditSocialLink,
//     handleRemoveSocialLink,
//     setNewLink, }
// ) => {

//   // Map social media platforms to their corresponding FontAwesome icons
//   const getPlatformIcon = (platform) => {
//     if (platform) {
//       switch (platform.toLowerCase()) {
//         case 'facebook':
//           return <FontAwesomeIcon className='' icon={faFacebookSquare} />;
//         case 'twitter':
//           return <FontAwesomeIcon className='' icon={faTwitterSquare} />;
//         case 'instagram':
//           return <FontAwesomeIcon className='' style={{ color: "#C13584" }} icon={faInstagram} />;
//         case 'linkedin':
//           return <FontAwesomeIcon className='' icon={faLinkedin} />;
//         case 'youtube':
//           return <FontAwesomeIcon className='' style={{ color: "#CD201F" }} icon={faYoutube} />;
//         case 'whatsapp':
//           return <FontAwesomeIcon className='' style={{ color: "#075e54	" }} icon={faWhatsapp} />;
//         // Add more cases for additional social media platforms
//         default:
//           return <FontAwesomeIcon icon={faFacebookSquare} />; // Default to Facebook icon
//       }
//     }

//   };

//   return (
//     <div className="social-management-container mt-5">
//       <h4 className='mb-4 text-dark'>Manage Social Accounts</h4>
//       <div className="add-link">
//         <select
//           value={newPlatform}
//           onChange={(e) => setNewPlatform(e.target.value)}
//           className="platform-select"
//         >
//           <option value="">Select a platform</option>
//           <option value="Facebook">Facebook</option>
//           <option value="Twitter">Twitter</option>
//           <option value="Instagram">Instagram</option>
//           <option value="LinkedIn">LinkedIn</option>
//           <option value="YouTube">YouTube</option>
//           <option value="WhatsApp">WhatsApp</option>

//           {/* Add more platform options here */}
//         </select>
//         <input
//           type="text"
//           placeholder="Enter the link"
//           value={newLink}
//           onChange={(e) => setNewLink(e.target.value)}
//           className="link-input"
//         />
//         <button onClick={handleAddLink} className="add-button">
//           Add
//         </button>

//       </div>
//       <ul className="social-links-list">
//         {socialLinks.map((item, index) => (
//           <li key={index} className="social-link-item">
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-link"
//             >
//               {getPlatformIcon(item.name)} {item.url}
//             </a>
//             <div className="row ms-300px">
//               <div className="col-md-6">
//                 <span onClick={() => handleRemoveSocialLink(index, item?.id)} className="icon-span delete-ic">
//                   <FontAwesomeIcon icon={faTrash} />
//                 </span>
//               </div>
//               <div className="col-md-6">
//                 <span className="icon-span edit-ic">
//                   <FontAwesomeIcon onClick={() => handleEditSocialLink(index, item?.id)}  icon={faEdit} style={{ backgroundColor: "" }} />
//                 </span>
//               </div>
//             </div>


//             {/* Add an Edit button and functionality here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageSocial;





import React, { useState } from 'react';
import './ManageSocial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {getPlatformIcon} from '../../common/CommonFunctions';
import CustomToggleSwitch from '../../common/CustomToggleSwitch';

const ManageSocial = ({
  socialLinks,
  isLocked,
  handleToggleSwitch,
  handleAddLink,
  handleEditSocialLink,
  handleRemoveSocialLink,
}) => {
  const [editingIndex, setEditingIndex] = useState(null); // State to track editing index
  const [id, setId] = useState(null);


  return (
    <div className="social-management-container mt-5">
      <h4 className="mb-4 text-dark">Manage Social Accounts</h4>
      <CustomToggleSwitch isLocked={isLocked} handleToggleSwitch={handleToggleSwitch}/>
      <Formik
        initialValues={{ newPlatform: '', newLink: '' }}
        onSubmit={(values, { resetForm }) => {
          if (editingIndex !== null) {
            // Handle editing if an index is set
            handleEditSocialLink(editingIndex, id, values.newPlatform, values.newLink);
            
            setEditingIndex(null); // Clear the editing index
            resetForm();
          } else {
            handleAddLink(values.newPlatform, values.newLink);
          }
          resetForm();
        }}
      >
        {({ values, }) => (
          <Form>
            <div className="add-link">
              <Field as="select" name="newPlatform" className="platform-select">
                <option value="">Select a platform</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="WhatsApp">WhatsApp</option>
                {/* Add more platform options here */}
              </Field>
              <ErrorMessage name="newPlatform" component="div" className="error" />
              <Field
                type="text"
                name="newLink"
                placeholder="Enter the link"
                className="link-input"
              />
              <ErrorMessage name="newLink" component="div" className="error" />
              <button type="submit" className="add-button">
                {editingIndex !== null ? 'Edit' : 'Add'} {/* Change button text based on editing state */}
              </button>
            </div>

            <ul className="social-links-list">
              {socialLinks.map((item, index) => (
                <li key={index} className="social-link-item">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {getPlatformIcon(item.name)} {item.url}
                  </a>
                  <div className="row ms-300px">
                    <div className="col-md-6">
                      <span
                        onClick={() => handleRemoveSocialLink(index, item?.id)}
                        className="icon-span delete-ic"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </div>
                    <div className="col-md-6">
                      <span className="icon-span edit-ic">
                        <FontAwesomeIcon
                          onClick={() => {
                            setEditingIndex(index); // Set editing index on "Edit" click
                            setId(item?.id);
                            values.newPlatform = item.name; // Populate the form fields with existing data
                            values.newLink = item.url;

                          }}
                          icon={faEdit}
                          style={{ backgroundColor: '' }}
                        />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageSocial;
