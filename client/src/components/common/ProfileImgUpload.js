import React from 'react'
import EPImage from '../../assets/blank-profile-picture.png'
import isEmpty from 'lodash.isempty'

const ProfileImgUpload = ({
    id,
    divClassName, 
    labelClassName, 
    labelValue, 
    onChange, 
    name, 
    inputClassName, 
    type,
    error, 
    placeholder, 
    onClickIcon,
    spanIconClassName,
    reference,
    onClick,
    onUpload,
    profileImg,
    iconClassName,
    contentType,
    acceptedFileTypes='image/*'
 }) => {

    return (
        <div className={divClassName}>
        {error ? (
            <div className='error-text'>
            {error}
            </div>
        ) : null}
            <label className={labelClassName}>{labelValue}</label>
            <input
                id={id}
                type='file' 
                ref={reference} 
                onChange={onUpload}
                accept={acceptedFileTypes}           
                style={{
                    display: 'none',
                }}
            />
            <button
                className={`form-control ${inputClassName}`}
                onChange={onChange}
                name={name}
                placeholder={placeholder} 
                disabled
                style={
                        isEmpty(profileImg) ? {
                        backgroundImage:`url(${EPImage})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    } : {backgroundImage:`url(${JSON.stringify(profileImg.path)})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }

                }
            >
                <span onClick={onClickIcon} className={iconClassName}>
                        <i className="fas fa-plus-circle"></i>
                </span> 
            </button>
       
        </div>
      
    )
}

export default ProfileImgUpload