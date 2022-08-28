// ${user.status === 'active' ? 'user-active' : 'user-inactive'}

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import PermissionItemHeader from './PermissionItemHeader';
import PermissionItem from './PermissionItem';

function Permissions({ permissions: userPermissions, superAdmin, role, user }) {
    const active = user.status === 'active'

    return (
        role === 'admin'
            ?
            <div>
                <div className="flex justify-between items-center ml-6">
                    <h2 className="font-semibold text-3xl">Permisssions</h2>
                    <span className={`${active ? '' : 'opacity-[0.5] pointer-events-none'} font-light`}>
                        {superAdmin ? 'Super Admin' : 'Admin'}
                    </span>
                </div>

                <div className={active ? '' : 'opacity-[0.5] pointer-events-none'}>
                    <div className="flex justify-between items-center pt-10 pb-6 border-b border-[#D8D8D8] ml-6">
                        <span className='font-bold'>Super Admin</span>

                        <label className={`user__status__switch user-active`}
                            style={{ margin: 'unset' }}
                        >
                            <input
                                type="checkbox"
                                className='user__status__switch__checkbox'
                                // onChange={e => handleUserStatusChange(e)}
                                defaultChecked={true}
                            />
                        </label>
                    </div>
                    <Accordion allowZeroExpanded onChange={(e) => console.log(e)}>
                        {
                            Object.keys(userPermissions).map(permission => {
                                const permissionItem = Object.keys(userPermissions[permission]);

                                return <AccordionItem className='border-b border-[#D8D8D8] ml-6 pb-4' key={permission}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <PermissionItemHeader key={permission} permission={permission} />
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                        {
                                            permissionItem.map(p => (
                                                <PermissionItem key={p} permissionItem={permissionItem} permissionItemKey={p} />
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
            <div className='text-xl font-bold'>
                Only admin can change permisssions
            </div>
    )
}

export default Permissions