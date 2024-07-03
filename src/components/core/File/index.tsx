import {
  NameConfig,
  Section,
  UICompBuilder,
  booleanExposingStateControl,
  eventHandlerControl,
  jsonControl,
  jsonExposingStateControl,
  jsonObjectStateControl,
  numberExposingStateControl,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import LabelWrapper from '../../../components/common/LabelWrapper';

const defStaticProps = {
  style: {
    width: '100%',
  },
};

let FileCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    files: jsonExposingStateControl('files', toJSONObjectArray, {}),
    file: jsonObjectStateControl('file', {}),
    accept: stringExposingStateControl('accept', ''),
    size: numberExposingStateControl('size', 10),
    multiple: booleanExposingStateControl('multiple', false),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when File Input is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const validateFile = (file: File) => {
      let error = '';
      const { name, size } = file ?? {};
      const fileExtension = name?.substring(name.lastIndexOf('.'))?.toLowerCase();
      if (!props.accept.value.includes(fileExtension)) {
        error = 'File không đúng định dạng';
      } else if (size > props.size.value * 1024 * 1024) {
        error = `File không được phép vượt quá ${props.size.value}MB`;
      }
      setInternalError(error);
    };

    const handleChange = (event: any, type: string = 'INPUT') => {
      event.preventDefault();
      const filesTemp = type === 'INPUT' ? event.target.files : event.dataTransfer.files;

      setInternalError('');
      if (!props.multiple.value) {
        const file = filesTemp[0];
        validateFile(file);

        // if (internalError.length > 0) {
        //   props.file.onChange(undefined);
        //   props.onEvent('change');
        //   this.onChange.emit(this.file);
        // } else {
        //   this.onChange.emit(file);
        // }
      } else {
        // this.inputFiles = [...this.inputFiles, ...filesTemp];
        // let sizeTotal = 0;
        // for (let i = 0; i < this.inputFiles.length; i++) {
        //   validateFile(this.inputFiles[i]);
        //   sizeTotal += this.inputFiles[i].size;
        //   if (this.internalError.length > 0) break;
        // }
        // if (sizeTotal > props.size.value * 1024 * 1024) {
        //   setInternalError(`Tổng kích thước các file không được phép vượt quá ${props.size.value}MB`);
        // }
        // if (this.internalError.length > 0) {
        //   this.files = [];
        //   this.inputFiles = [];
        //   this.onChange.emit(this.files);
        // } else {
        //   this.onChange.emit(this.inputFiles);
        // }
      }
      // this.myFileInput.nativeElement.value = '';
    };

    const [files, setFiles] = useState([]);
    const [internalError, setInternalError] = useState('');
    const fileInput = useRef(null);
    const buttonFileInput = useRef(null);

    const handleFileChange = (event: any, type: any) => {
      // const newFiles = Array.from(event.target.files || event.dataTransfer.files);
      // setFiles(multiple ? [...files, ...newFiles] : newFiles);
      // if (onFileChange) onFileChange(newFiles, type);
    };

    const handleDeleteFile = (fileToDelete: any) => {
      // const updatedFiles = files.filter((file) => file !== fileToDelete);
      // setFiles(updatedFiles);
      // if (onDeleteFile) onDeleteFile(fileToDelete);
    };

    const handleDragOver = (event: any) => {
      // event.preventDefault();
    };

    const handleDragLeave = (event: any) => {
      // event.preventDefault();
    };

    const handleDrop = (event: any) => {
      // event.preventDefault();
      // handleFileChange(event, 'DROP');
    };

    return (
      <div style={{ padding: '5px' }}>
        <LabelWrapper label={props.label.value} required={props.required.value} error={props.error.value} caption={props.caption.value} showCaption={props.showCaption.value}>
          <button
            ref={buttonFileInput}
            className={`p-inputtext cursor-pointer ${props.error.value || internalError ? 'ng-invalid ng-dirty' : ''}`}
            onClick={() => (fileInput?.current as any)?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='relative'>
              <div className='text-lg text-center'>
                Kéo thả file hoặc <b>Chọn file</b> để tải lên
              </div>
              <div className='text-center mt-2'>
                (Cho phép dung lượng tối đa {props.size.value}MB và chỉ chấp nhận định dạng {props.accept.value})
              </div>
            </div>
          </button>
          <input ref={fileInput} type='file' accept={props.accept.value} required={props.required.value} onChange={handleChange} hidden multiple={props.multiple.value} />

          {!props.multiple.value && props.files.value.length > 0 && (
            <div className='flex justify-content-between align-items-center pt-2 pb-2 custom-file'>
              <div className='custom-file-name'>{props.files.value[0].name}</div>
            </div>
          )}

          {props.multiple.value &&
            props.files.value.length > 0 &&
            props.files.value.map((file: any, index: any) => (
              <div key={index} className='flex justify-content-between align-items-center pt-2 pb-2 custom-file'>
                <div className='custom-file-name'>{(file as any)?.name}</div>
                {/* <Button styleClass='p-button-sm p-button-rounded p-button-text' icon='pi pi-trash' onClick={() => handleDeleteFile(file)} /> */}
              </div>
            ))}
        </LabelWrapper>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>{children.staticProps.propertyView({ label: 'Static Props' })}</Section>
          <Section name='Form'>
            {children.label.propertyView({ label: 'Label' })}
            {children.error.propertyView({ label: 'Error' })}
            {children.caption.propertyView({ label: 'Caption' })}
            {children.showCaption.propertyView({ label: 'Show caption' })}
            {children.required.propertyView({ label: 'Required' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact InputText.</li>
              <li>
                <a href='https://primereact.org/inputtext/' target='_blank'>
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();
const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
];
export default withExposingConfigs(FileCompBase, exposingConfigs);
