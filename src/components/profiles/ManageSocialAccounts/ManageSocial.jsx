import React, { useState } from 'react';
import './ManageSocial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const [editingIndex, setEditingIndex] = useState(null); 
  const [id, setId] = useState(null);
  let customTitle = isLocked ? 'Lock' : 'Unlock'
  customTitle += " your social accounts"

  return (
    <div className="social-management-container mt-5">
      <h4 className="mb-4 text-dark">Manage Social Accounts</h4>
      <CustomToggleSwitch isLocked={isLocked} handleToggleSwitch={handleToggleSwitch} title={customTitle}/>
      <Formik
        initialValues={{ newPlatform: '', newLink: '' }}
        onSubmit={(values, { resetForm }) => {
          if (editingIndex !== null) {
            handleEditSocialLink(editingIndex, id, values.newPlatform, values.newLink);
            
            setEditingIndex(null);
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
                {editingIndex !== null ? 'Edit' : 'Add'} 
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
                            setEditingIndex(index);
                            setId(item?.id);
                            values.newPlatform = item.name; 
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
