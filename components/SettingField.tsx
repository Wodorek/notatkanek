import { useState } from 'react';
import classes from './SettingField.module.css';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  name: string;
  val: string;
  register: UseFormRegister<FieldValues>;
}

const SettingField: React.FC<IProps> = (props) => {
  const [inputValue, setInputValue] = useState(props.val);

  return (
    <div className={classes.settingField}>
      <label htmlFor="settingName" className={classes.label}>
        {props.name}:
      </label>
      <input
        {...props.register(props.name)}
        className={classes.textField}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SettingField;
