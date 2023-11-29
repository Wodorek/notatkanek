import classes from './Modal.module.css';
import { BsXLg } from 'react-icons/bs';
import { useForm, FieldValues, UseFormRegister } from 'react-hook-form';
import SettingField from './SettingField';

interface IProps {
  closeModal: () => void;
  updateSettings: (settings: { [key: string]: string }) => void;
  settings: { [key: string]: any };
}

const Modal: React.FC<IProps> = (props) => {
  const settingKeys = Object.keys(props.settings);

  const { register, handleSubmit, watch } = useForm();

  function submitHander(data: any) {
    props.updateSettings(data);
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
          onSubmit={handleSubmit(submitHander)}
        >
          {settingKeys.map((setting) => {
            return (
              <SettingField
                register={register}
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
