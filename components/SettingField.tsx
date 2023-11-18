import { useState } from 'react';
import classes from './SettingField.module.css';

interface IProps {
  name: string;
  val: string;
}

const SettingField: React.FC<IProps> = (props) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={classes.settingField}>
      <label htmlFor="settingName" className={classes.label}>
        {props.name}
      </label>
      <input
        className={classes.textField}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SettingField;
