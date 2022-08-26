import { useState } from 'react'

import Link from "next/link";
import { AnimatePresence } from "framer-motion";

import Modal from "../modal";
import DeleteUser from "../DeleteUser";

function TableRow({ user }) {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <tr key={user.first_name}>
                <td className="text-left">{user.last_name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                    <div className="flex justify-end items-center">
                        <Link href={`/users/${user.id}`}>
                            go to user
                        </Link>
                        <div onClick={() => setOpenModal(true)}>
                            delete user
                        </div>
                    </div>
                </td>
            </tr>
            <AnimatePresence>
                {
                    openModal && <Modal setOpenModal={setOpenModal} title="Delete user">
                        <DeleteUser
                            firstName={user.first_name}
                            lastName={user.last_name}
                            id={user.id}
                            setOpenModal={setOpenModal}
                        />
                    </Modal>
                }
            </AnimatePresence>
        </>
    )
}

export default TableRow