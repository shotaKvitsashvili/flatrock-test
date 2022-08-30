import { useEffect, useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';

function UserInfo({ data, user, setValue, setLargeFileWarning, maxSize }) {
    const { first_name, last_name, email, role, img } = data
    const [imgSrc, setImgSrc] = useState(img)

    const fileUploadLabel = useRef()

    useEffect(() => {
        fileUploadLabel.current && fileUploadLabel.current.querySelector('input[type="file"]').setAttribute('accept', 'image/*')
    }, [fileUploadLabel])

    const active = user.status === 'active'

    return (
        <div className='flex flex-col w-full lg:w-fit items-center text-center'>
            <div className={`w-[230px] h-[230px] user__page__avatar ${role === 'admin' ? 'user__page__avatar--admin' : ''}`}>
                <img src={imgSrc} alt={first_name + ' ' + last_name} className="w-full h-full object-cover rounded-full" />

                <div className='rounded-[30px] mr-2 py-2 px-4 bg-[#7E7EF1] user__page__avatar__key'>
                    <img src='/icons/key.svg' alt='key' />
                </div>
            </div>

            {
                <label className={`font-light cursor-pointer color-[#B0ACAC] text-sm pt-4 pb-8 ${active ? 'opacity-[.7]' : 'opacity-0'}`} ref={fileUploadLabel}>
                    UPLOAD A PHOTO
                    {/* <input type="file" className='hidden' /> */}
                    <div className="hidden">
                        <FileBase64
                            multiple={false}
                            onDone={(p) => {
                                const { base64, size } = p
                                const imgSize = size.split(' ')[0]

                                imgSize < maxSize && setImgSrc(base64)
                                imgSize < maxSize ? setValue('img', base64) : setLargeFileWarning(true)
                            }}
                        />
                    </div>
                </label>
            }

            <div className={`flex flex-col ${active ? '' : 'opacity-[0.5]'}`}>
                <span className='font-semibold text-5xl mb-4'>{first_name}</span>
                <span className='font-semibold text-5xl'>{last_name}</span>
                <span className='m-4 font-light'>{email}</span>
            </div>

            {
                active && <div className='rounded-[100px] bg-[#7E7EF1] text-white shadow-[0px_3px_6px_#00000029] py-4 w-fit lg:w-full mt-6 px-4'>
                    Resend the invite
                </div>
            }
        </div>
    )
}

export default UserInfo