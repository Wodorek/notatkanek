import React, { useEffect, useState } from 'react';
import classes from './Modal.module.css';
import { BsXLg } from 'react-icons/bs';
import SettingField from './SettingField';

interface IProps {
  closeModal: () => void;
  updateSettings: (setting: string, value: any) => void;
  settings: { [key: string]: any };
}

const Modal: React.FC<IProps> = (props) => {
  const settingKeys = Object.keys(props.settings);

  function submitHander(e: React.FormEvent) {
    e.preventDefault();

    console.log(e.target);
  }

  return (
    <div className={classes.modal}>
      <div className={classes.closeBtn} onClick={props.closeModal}>
        <BsXLg size={45} />
      </div>
      <div className={classes.settingsCard}>
        <h3 className={classes.header}>Settings</h3>
        <form
          className={classes.settingsContainer}
          onSubmit={(e) => submitHander(e)}
        >
          {settingKeys.map((setting) => {
            return (
              <SettingField
                name={setting}
                key={setting}
                val={props.settings[setting]}
              />
            );
          })}
          <div className={classes.saveBtnContainer}>
            <button className={classes.btn}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
