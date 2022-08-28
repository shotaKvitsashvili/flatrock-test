import { useState } from 'react';
import FileBase64 from 'react-file-base64';

function UserInfo({ data, user, setValue, setLargeFileWarning, maxSize }) {
    const { first_name, last_name, email, role, img } = data
    const [imgSrc, setImgSrc] = useState(img)

    const active = user.status === 'active'

    return (
        <div className='flex flex-col w-fit items-center text-center'>
            <div className={`w-[230px] h-[230px] user__page__avatar ${role === 'admin' ? 'user__page__avatar--admin' : ''}`}>
                <img src={imgSrc} alt={first_name + ' ' + last_name} className="w-full h-full object-cover rounded-full" />

                <div className='rounded-[30px] mr-2 py-2 px-4 bg-[#7E7EF1] user__page__avatar__key'>
                    <img src='/icons/key.svg' alt='key' />
                </div>
            </div>

            {
                <label className={`font-light cursor-pointer color-[#B0ACAC] text-sm pt-4 pb-8 ${active ? 'opacity-[.7]' : 'opacity-0'}`}>
                    UPLOAD A PHOTO
                    {/* <input type="file" className='hidden' /> */}
                    <div className="hidden">
                        <FileBase64
                            multiple={false}
                            onDone={({ base64, size }) => {
                                console.log(size);
                                const imgSize = size.split(' ')[0]
                                console.log(parseInt(imgSize));

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
                active && <div className='rounded-[100px] bg-[#7E7EF1] text-white shadow-[0px_3px_6px_#00000029] py-4 w-full mt-6'>
                    Resend the invite
                </div>
            }
        </div>
    )
}

export default UserInfo