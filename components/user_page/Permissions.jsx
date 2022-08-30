import axios from 'axios'
import { useDispatch } from 'react-redux'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import PermissionItemHeader from './PermissionItemHeader';
import PermissionItem from './PermissionItem';

import { editUser } from '../redux/reducers/userSlice'

function Permissions({ permissions: userPermissions, role, user, id }) {
    const active = user.status === 'active'

    const dispatch = useDispatch()

    const handleUserStatusChange = e => {
        const { checked } = e.target;

        const u = { ...user }
        u.superAdmin = checked
        dispatch(editUser(u))

        axios.put(`https://flatrock-api.herokuapp.com/api/users/${id}`, u)
    }

    return (
        role === 'admin'
            ?
            <div>
                <div className="flex justify-between items-center ml-0 lg:ml-6 mt-6 lg:mt-0">
                    <h2 className="font-semibold text-3xl">Permisssions</h2>
                    <span className={`${active ? '' : 'opacity-[0.5] pointer-events-none'} font-light`}>
                        {user.superAdmin ? 'Super Admin' : 'Admin'}
                    </span>
                </div>

                <div className={active ? '' : 'opacity-[0.5] pointer-events-none'}>
                    <div className="flex justify-between items-center pt-10 pb-6 border-b border-[#D8D8D8] ml-0 lg:ml-6">
                        <span className='font-bold'>Super Admin</span>

                        <label className={`user__status__switch ${user.superAdmin ? 'user-active' : 'user-inactive'}`}
                            style={{ margin: 'unset' }}
                        >
                            <input
                                type="checkbox"
                                className='user__status__switch__checkbox'
                                onChange={e => handleUserStatusChange(e)}
                                defaultChecked={user.superAdmin}
                            />
                        </label>
                    </div>
                    <Accordion allowZeroExpanded>
                        {
                            Object.keys(userPermissions).map(permission => {
                                const permissionItem = Object.keys(userPermissions[permission]);

                                return <AccordionItem className='border-b border-[#D8D8D8] ml-6 pb-4' key={permission}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className={user.superAdmin ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
                                            <PermissionItemHeader key={permission} permission={permission} user={user} id={id} />
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel className={user.superAdmin ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
                                        {
                                            permissionItem.map(p => (
                                                <PermissionItem
                                                    key={p}
                                                    permissionItemKey={p}
                                                />
                                            ))
                                        }
                                    </AccordionItemPanel>
                                </AccordionItem>
                            })
                        }
                    </Accordion>
                </div>
            </div>
            :
            <div className='text-xl font-bold text-center lg:text-left mt-4 lg:mt-0'>
                Only admin can change permisssions
            </div>
    )
}

export default Permissions