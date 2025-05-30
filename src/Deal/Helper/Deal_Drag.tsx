import { ReactSortable } from 'react-sortablejs';
import debounce from 'lodash.debounce';
import { useState, useEffect } from 'react';
import { GetUserAPI } from '../../APIurl/url';
import Card from '@mui/material/Card';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import '../../pages/Pages/Helper/style.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/style.css';
import getCookie from '../../getLoggedUser/GetUserInfomation';
const Scrumboard = ({ setLoader }: { setLoader: (value: boolean | ((prev: boolean) => boolean)) => void }) => {
    const MySwal = withReactContent(Swal);
    const jwt = getCookie('jwt') || '';
    const [karbanData, projectList] = useState<any>([]);
    const [Refresh, setrefresh] = useState(true);
    const [bgcolor, setBgColor] = useState('');
    const [lastID, setlastID] = useState('all');
    const [newRecord, setnewRecord] = useState(null);
    const [Limit, SetLimit] = useState(150);
    const [page, Setpage] = useState(1);
    const [lead_Source, SetSource] = useState('all');
    const [GetDate, SetGetDate] = useState('all');

    const debouncedFetch = debounce(() => {
        let url = `lastid=${lastID}&newRecord=${newRecord}&limit=${Limit}&page=${page}&sources=${lead_Source}&getdate=${GetDate}`;
        fetch(GetUserAPI + `?view=karban.deal&${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authenticate: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'karban.data.lead.view.agent',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const newData = data.data;
                projectList(newData);
                setrefresh(false);
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }, 300);

    useEffect(() => {
        if (Refresh) {
            setLoader(true);
            debouncedFetch();
        }
    }, [Refresh]);

    const [DragItem, setDrgaItem] = useState(false);
    const [OldDragItem, setOldDragItem] = useState(false);
    const [onDragNew, setDrgaINewtems] = useState();
    const [ItmeId, setItmeId] = useState();

    /**
     * Updates the deal status by making a POST request to the GetUserAPI endpoint.
     * 
     * @param {object} DragItem - The new drag item
     * @param {object} OldDragItem - The old drag item
     * @param {boolean} onDragNew - Whether a new drag item is being added
     * @param {number} ItmeId - The ID of the item being updated
     * 
     * @example
     * useEffect(() => {
     *   if (dragItem && oldDragItem && onDragNew && itemId) {
     *     // API request will be made with the provided parameters
     *   }
     * }, [dragItem, oldDragItem, onDragNew, itemId]);
     */
    const [DragTrue, setDrgaINewData] = useState(false);

    useEffect(() => {
        if (DragItem && OldDragItem && onDragNew && ItmeId && DragTrue === true) {
            MySwal.fire({
                title: 'Add Comment',
                input: 'textarea',
                inputPlaceholder: 'Type your comment here...',
                inputAttributes: {
                    'aria-label': 'Type your comment here',
                    'required': 'true' // Make the input required
                },
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showCloseButton: true,
                customClass: {
                    popup: 'color-default',
                },
                preConfirm: (comment) => {
                    if (!comment) {
                        MySwal.showValidationMessage('Comment is required');
                        return false; // Prevent the prompt from closing
                    }
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    fetch(GetUserAPI + '?edit=karban.Deal.dragItem', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authenticate: `Bearer ${jwt}`,
                        },
                        body: JSON.stringify({
                            PAGE_REQUEST: 'karban.data.update.deal.agent',
                            dealId: ItmeId,
                            OldDragItem: OldDragItem,
                            onDragNew: onDragNew,
                            comment: result.value
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.status == true) {
                                setlastID(ItmeId);
                                MySwal.fire({
                                    title: 'Deal Status Updated',
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 2000,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'color-default',
                                    },
                                });
                            } else {
                                MySwal.fire({
                                    title: data.message,
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 2000,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'color-danger',
                                    },
                                });
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    setDrgaINewData(false);
                }
            });
        }
    }, [DragItem, OldDragItem, onDragNew, ItmeId]);


    /**
    * Handles drag events by updating the state with the old column ID, new column ID, and item ID.
    *
    * @param {DragEvent} event - The drag event object.
    * @param {string} NewColumnId - The ID of the new column where the item is being dragged to.
    *
    * @example
    * handleDrags(event, 'new-column-id');
    */

    const handleDrags = (event: any, NewColumnId: any) => {

        const oldvalue = event.from.getAttribute('id');
        setDrgaINewData(true);
        setOldDragItem(oldvalue);
        setDrgaINewtems(NewColumnId);
        setItmeId(event.item.getAttribute('data-id'));
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const formatDates = (createdAt: any) => {
        const date = new Date(createdAt);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diff / (1000 * 60));
        if (diffMinutes < 1) {
            return 'Just now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minute(s) ago`;
        } else if (diffMinutes < 60 * 6) {
            return `${Math.floor(diffMinutes / 60)} hour(s) ago`;
        } else {
            return `${date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })} - ${date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
            })}`;
        }
    };
    return (
        <div className="relative p-0 overflow-x-auto bg_image_design">
            <div className="flex gap-5 pb-2 px-2">
                {karbanData.map((project: any) => (
                    <div key={project.id} className="panel w-80 flex-none bg-transform ">
                        <div
                            id={`Color_back_` + project.id}
                            className={`element-with-background flex justify-between mb-5  p-1` + project.CLASS}
                            style={{
                                borderRadius: '5px',
                                color: project.text_color,
                                fontWeight: '700',
                                background: bgcolor ? bgcolor : project.bg_color,
                                padding: '4px',
                            }}
                        >
                            <h4 className="text-xs" style={{ lineHeight: '25px', fontWeight: '700' }}>
                                {project.status} <span className="font-thin">({project.data.length})</span>
                            </h4>
                        </div>
                        <div className="  set_w_and_h  shadow-none" style={{ overflow: 'auto' }}>
                            <ReactSortable
                                list={project.data}
                                setList={(newState) => {
                                    const newList = karbanData.map((task: any) => {
                                        if (task.id == project.id) {
                                            task.data = newState;
                                            setDrgaItem(true);
                                        }
                                        return task;
                                    });
                                }}
                                animation={200}
                                group="shared"
                                ghostClass="sortable-ghost"
                                dragClass="sortable-drag"
                                className="connect-sorting-content  min-h-[100%]"
                                id={project.id}
                                onAdd={(evt) => handleDrags(evt, project.id)}
                            >
                                {project.data.map((task: any, index: any) => (
                                    <div key={task.ID}>
                                        <Card className="h-[100%] mx-2 mb-2 crm-kanban-item-line sortable-list" key={task.id} data-drop={task.id}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Grid>
                                                    <ul>
                                                        <li className="mt-2 ml-2">
                                                            <NavLink to={`/agent/client/view/${task.LEAD_STUDENT_ID}/${JSON.parse(task.LEAD_INFORMATION).CLIENT_IDS}`}>
                                                                <span className="font-semibold text-black underline">
                                                                    Lead Student# {JSON.parse(task.LEAD_INFORMATION).FIRST_NAME + ' ' + JSON.parse(task.LEAD_INFORMATION).LAST_NAME}
                                                                </span><br />
                                                                <span className="font-semibold text-black">
                                                                    Lead ID : ID_{task.ID}
                                                                </span>
                                                            </NavLink>
                                                        </li>
                                                    </ul>

                                                    {/* Information header */}
                                                    <ul className="mb-2 mt-5 move-icon">
                                                        <li className="mt-2 ml-2">
                                                            <span className="text-black heading-font">NAME</span>
                                                        </li>
                                                        <li className="ml-2">
                                                            <p className="font-normal text-stone-600">
                                                                {JSON.parse(task.LEAD_INFORMATION).FIRST_NAME + ' ' + JSON.parse(task.LEAD_INFORMATION).LAST_NAME}
                                                            </p>
                                                        </li>

                                                        <li className="mt-2 ml-2">
                                                            <span className="heading-font text-black ">EMAIL</span>
                                                        </li>
                                                        <li className="ml-2">
                                                            <p className="font-normal text-stone-600">{JSON.parse(task.LEAD_INFORMATION).EMAIL}</p>
                                                        </li>

                                                        <li className="mt-2 ml-2">
                                                            <span className="heading-font text-black">PHONE_NUMBER</span>
                                                        </li>
                                                        <li className="ml-2">
                                                            <p className="font-normal text-stone-600">{JSON.parse(task.LEAD_INFORMATION).PHONE_NUMBER}</p>
                                                        </li>

                                                        <li className="mt-2 ml-2">
                                                            <span className="heading-font text-black">ADDRESS</span>
                                                        </li>
                                                        <li className="ml-2">{JSON.parse(task.LEAD_INFORMATION).ADDRESS}</li>

                                                        <li className="mt-2 ml-2">
                                                            <span className="heading-font text-black">CITY</span>
                                                        </li>
                                                        <li className="ml-2">{JSON.parse(task.LEAD_INFORMATION).CITY}</li>
                                                    </ul>
                                                </Grid>
                                                <ul className="flex justify-between mb-3 mt-2 footer-section-content">
                                                    <li className="ml-2"></li>
                                                    <li className="flex">
                                                        <span className="mr-2">{formatDates(JSON.parse(task.LEAD_INFORMATION).CREATE_AT)}</span>
                                                        <Avatar
                                                            title={JSON.parse(task.LEAD_OWNER).CLIENT_NAME}
                                                            src={JSON.parse(task.LEAD_OWNER).PROFILE_URL}
                                                            sx={{ width: 24, height: 24 }}
                                                            className="mr-2"
                                                            alt={JSON.parse(task.LEAD_OWNER).CLIENT_NAME}
                                                        />
                                                    </li>
                                                </ul>
                                            </Box>
                                        </Card>
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Scrumboard;
