import React from 'react';
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

  return (
    <div className={classes.modal}>
      <div className={classes.closeBtn} onClick={props.closeModal}>
        <BsXLg size={45} />
      </div>
      <div className={classes.settingsCard}>
        {settingKeys.map((setting) => {
          return <SettingField name={setting} key={setting} />;
        })}
      </div>
    </div>
  );
};

export default Modal;
