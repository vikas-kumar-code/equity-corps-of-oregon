"use client"

import React, { memo, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import AddEditMilestone from './AddEditMilestone'
import moment from 'moment'

function Milestones(props) {
    const [milestones, setMilestones] = useState(props.milestones)
    const [showModal, setShowModal] = useState(false)

    const updateMilestones = (milestone) => {
        let newMilestones = [...milestones, milestone]
        setMilestones(newMilestones)
        props.updateMilestones(newMilestones)
        setShowModal(false);
    }
    const deleteRecord = (index) => {
        if (window.confirm('Are you sure to delete?')) {
            if (milestones[index].case_id === undefined) {
                let newMilestones = milestones.filter((r, indx) => index !== indx);
                setMilestones(newMilestones)
                props.updateMilestones(newMilestones)
            }
            else {
                let params = { id: milestones[index].id }
                events.deleteProgram(params).then((response) => {
                    if (response.data.success) {
                        let records = this.state.records.filter((r) => parseInt(r.id) !== parseInt(this.state.records[index].id))
                        this.setState({ records }, () => {
                            toast.success(response.data.message, {
                                position: toast.POSITION.TOP_RIGHT,
                            })
                        })
                    } else {
                        toast.error(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error('Unexpected error !', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                })
            }
        }
    }
    return (
        <Row>
            <Col md={6} sm={12}>{props.errors.milestone && milestones.length === 0 && <span className='text-danger'>Please add milestone for this case.</span>}</Col>
            <Col md={6} sm={12} className='text-end'><Button variant='primary' onClick={() => setShowModal(true)}>Add New Milestone</Button></Col>
            <Col md={12} sm={12}>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date </th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {milestones.map((record, index) => <tr key={`milestones-key-${index}`}>
                                <td>{Number(index + 1)}.</td>
                                <td>{moment(new Date(record.milestone_date)).format('MMMM DD, YYYY')}</td>
                                <td>{record.comment}</td>
                                <td>
                                    {record.case_id !== undefined && <Button variant='primary' className='me-2'>Edit</Button>}
                                    <Button variant='danger' onClick={() => deleteRecord(index)} size='sm'>Delete</Button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </Col>
            {showModal && <AddEditMilestone
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                updateMilestones={updateMilestones}
            />}
        </Row>
    )
}

export default memo(Milestones)
