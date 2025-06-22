import { forwardRef } from 'react';
import cl from "../FileInput.module.css";
import { device } from '../../../../constants/device';

const NoPhotosComponent = forwardRef(({ files, imageStyle, addFiles }, ref) => {
  const handleFileChange = (event) => {
  console.log('Файлы выбраны:', event.target.files); // ❗Проверка
  const selectedFiles = event.target.files;

  if (!selectedFiles || selectedFiles.length === 0) return;

  const newFiles = [];

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    console.log('Обрабатываем файл:', file); // ❗Проверка

    const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
    const newName = `photo_${Date.now()}_${i}${fileExtension}`;

    const renamedFile = new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    });

    console.log('Созданный файл:', renamedFile); // ❗Проверка
    newFiles.push(renamedFile);
  }

  console.log('Отправляем в addFiles:', newFiles); // ❗Проверка
  addFiles(newFiles);

  if (ref?.current) {
    ref.current.value = '';
  }
};

  return (
    <label
      style={files.length === 5 ? { display: "none" } : imageStyle}
      className={files.length !== 0 ? cl.ActiveMainLabel : cl.MainLabel}
      htmlFor="file"
    >
      <input
        style={{
          display : "none"
        }}
        ref={ref}
        onChange={handleFileChange}
        type="file"
        multiple={!device.includes("android")} // отключаем множественный выбор на Android
        name="file"
        id="file"
        accept="image/*"
        className={cl.none}
      />

      <img src="/images/AdCreating/LoadImageIcon.svg" className='w-[24px] h-[24px]' alt="Загрузить фото" />

      <p className='!text-[#2EA6FF] !text-[17px] !font-sf-pro-display-600 !font-semibold leading-[15.643px] tracking-[0.34px]'>
        Добавить фото
      </p>
    </label>
  );
});

export default NoPhotosComponent;