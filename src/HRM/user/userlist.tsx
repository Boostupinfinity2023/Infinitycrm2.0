import React, { useState, useEffect } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Chip, User, Pagination, Selection, ChipProps, SortDescriptor, Spinner, Modal, ModalContent, Select, SelectItem
} from "@nextui-org/react";
import { Tooltip, message } from 'antd';
import './style.css';
import { GetUserAPI } from '../../APIurl/url';
import { DELETE } from '../../APIurl/url';
import Userprofile from '../Profile';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Token from '../../getLoggedUser/GetUserInfomation';
import { debounce } from 'lodash';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Emptyimage from '../../../public/TableEmpty/Empty.jpg';
const columns = [
  // { name: "ID", uid: "ID", sortable: true },
  { name: "ID", uid: "#", sortable: true },
  { name: "BRANCH", uid: "BRANCH", sortable: true },
  { name: "EMAIL", uid: "CLIENT_EMAIL", sortable: true },
  { name: "NAME", uid: "CLIENT_NAME", sortable: true },
  { name: "ROLE", uid: "ROLE", sortable: true },
  { name: "STATUS", uid: "IS_ACTIVE", sortable: true },
  { name: "ACTIONS", uid: "ACTIONS" },
];

const INITIAL_VISIBLE_COLUMNS = ["CLIENT_NAME", "#", "CLIENT_EMAIL", "ROLE", "IS_ACTIVE", "ACTIONS"];

export default function App() {

  const token = Token('jwt');

  const MySwal = withReactContent(Swal);
  const [getuser, setUserData] = useState([]);
  const [Metadata, setmetadata] = useState([]);
  const [isloading, setloading] = useState(false);
  const [isrefresh, setRefresh] = useState(false);
  const [limit, setLimit] = useState(10);
  const [Sortby, Setsortby] = useState('ID');
  const [Sortcall, Setsortcall] = useState('DESC');
  const [Selectrole, SetSelectrole] = useState('');
  const [Status, SetStatus] = useState('');
  const [page, setPage] = React.useState(1);
  const [selectedUserId, setSelectedUserId] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  function onOpenChange(unusedArg: any) {
    if (isOpen == true) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const UPDATEPROFILE = (userId: any) => {
    if (isOpen == false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setTimeout(() => {
        setIsOpen(true);
      }, 10);
    }
    setSelectedUserId(userId);

  };

  const debouncedUserFetch = debounce(async () => {
    setloading(true); // Set loading before making the request
    setRefresh(false);
    const parametter = `?onlyview=true&limit=${limit}&page=${page}&order=${Sortcall}`;

    try {
      const response = await fetch(GetUserAPI + parametter, {
        method: 'POST',
        headers: {
          Authenticate: `Bearer ${token}`,
          'x-token-access': 'true',
        },
        body: JSON.stringify({ PAGE_REQUEST: 'GetUserData', role: Selectrole, Status: Status }),
      });

      const data = await response.json();
      setUserData(data.data);
      setmetadata(data);
    } catch (err) {
      console.error(err); // Log the error for debugging
    } finally {
      setloading(false); // Always set loading to false after request completion
    }
  }, 300);


  useEffect(() => {
    debouncedUserFetch();
    return () => {
      debouncedUserFetch.cancel();
    };
  }, [isrefresh, Selectrole, Status]);

  const loadingState = (isloading) ? "loading" : "idle";;

  const users: any = getuser ?? [];
  const metadata: any = Metadata ?? [];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "",
    direction: "descending",
  });





  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);



  //STATUS change
  const handleToggleActive = (userId: number, value: string) => {
    Swal.fire({
      title: `Are you sure you want to ${value === 'Y' ? 'deactivate' : 'activate'} this user?`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const parametter = '?ACTIVE=' + userId + '&DEACTIVE=' + value;
          fetch(GetUserAPI + parametter, {
            method: 'POST',
            body: JSON.stringify({ PAGE_REQUEST: 'Update&activeDeactive' }),
            headers: {
              'Content-Type': 'application/json',
              'Authenticate': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.status == true) {
                message.success('Account Status Change Successfully');
                setRefresh(true);
              } else {
                message.error('something went wrong');
              }

            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        } catch (err) {
          setloading(false);
        }
      }
    });
  };

  //Delect user data
  const UserDelete = (user: any) => {
    Swal.fire({
      title: `<p style="font-size='18px'">Are you sure you want to delete Account?<p>  <p style="font-size='20px'">${user.CLIENT_EMAIL} </p>`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#006ed9",
      cancelButtonColor: "#006ed9",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(DELETE, {
            method: 'POST',
            body: JSON.stringify({ PAGE_REQUEST: 'DELETE_USER', USER_ID: user.ID }),
            headers: {
              'Content-Type': 'application/json',
              'Authenticate': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.status == true) {
                message.success('Account Delete Successfully');
                setRefresh(true);
              } else {
                message.error('Failed to Delete');
              }
            })
            .catch(error => {

              console.error('Error fetching user data:', error);
            });

        } catch (err) {
          setloading(false);
        }

      }
    });
  };

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Y: 'success',
    N: 'danger',
  };



  const renderCell = React.useCallback((user: any, columnId: any, index: number) => {
    const value = user[columnId];
    switch (columnId) {
      case "#":
        return (
          <>{index + 1}</>
        );
      case "CLIENT_NAME":
        return (
          <User
            avatarProps={{ radius: "lg", showFallback: true, src: user.PROFILE_URL }}

            name={value}
          >
           <span data-column="hfufk"> {user.CLIENT_NAME}</span>
          </User>
        );
      case "ROLE":
        return (
      
          <div className="flex flex-col">
            <span data-column="jkrrjjnk">
            <p className="text-bold text-small capitalize">{value}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.NAME}</p>
            </span>
          </div>
        );
      case "IS_ACTIVE":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[String(value)]}
            size="sm"
            variant="dot"
            style={{ cursor: 'pointer' }}
            onClick={() => handleToggleActive(user.ID, value)}
          >
            {value === 'Y' ? 'Active' : 'Deactive'}
          </Chip>
        );

      case "ACTIONS":
        return (
          <div className="flex text-2xl gap-3 mobtabalign">
            <Tooltip showArrow={true} title="Edit Profile">
              <span className="cursor-pointer" onClick={() => UPDATEPROFILE(user.CLIENT_ID)} ><CiEdit style={{ color: '#006ed9' }} /></span>
            </Tooltip>
            <Tooltip showArrow={true} title="Delete Profile">
              <span className="cursor-pointer" onClick={() => UserDelete(user)}><MdDeleteOutline style={{ color: '#ff0000' }} /></span>
            </Tooltip>
          </div>
        );
      default:
        return value;
    }
  }, []);


  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])


  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex justify-end gap-3">
          <Select
            aria-label="Status"
            size={"md"}
            placeholder="Status"
            className="max-w-[200px] "
            onChange={(e) => SetStatus(e.target.value)}
          >
            <SelectItem key="Y">
              Active
            </SelectItem>
            <SelectItem key="N">
              Deactive
            </SelectItem>
          </Select>

          <Select
            aria-label="Role"
            size={"md"}
            placeholder="Role"
            className="max-w-[200px] "
            onChange={(e) => SetSelectrole(e.target.value)}
          >
            <SelectItem key="agent">
              Agent
            </SelectItem>
            <SelectItem key="staff">
              Staff
            </SelectItem>
          </Select>
          <Select
            aria-label="Rows per page"
            size={"md"}
            placeholder="Rows per page:"
            className="max-w-[200px] "
            onChange={(e) => {
              const newLimit = parseInt(e.target.value);
              setLimit(newLimit); // assuming you have a state variable called 'limit'
              setRefresh(true);
            }}
          >
            <SelectItem key="20">20</SelectItem>
            <SelectItem key="40">40</SelectItem>
            <SelectItem key="60">60</SelectItem>
            <SelectItem key="80">80</SelectItem>
            <SelectItem key="100">100</SelectItem>
          </Select>
        </div>
      </>
    );
  }, [
    filterValue,
    visibleColumns,
  ]);

  const bottomContent = React.useMemo(() => {
    let totalPages = Math.ceil(metadata.totalRecord / parseInt(metadata.view_Record));
    let startEntry = (metadata.page - 1) * parseInt(metadata.view_Record) + 1;
    let endEntry = Math.min(metadata.page * parseInt(metadata.view_Record), metadata.totalRecord);
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          color="primary"
          total={totalPages || 1}
          onChange={(e) => {

            const newPage = Number(e);
            setPage(newPage);
            setRefresh(true);
          }}
        />
        <span className="text-small text-default-400">
          {`Showing ${startEntry} to ${endEntry} of ${metadata.totalRecord} entries`}
        </span>
      </div>
    );
  }, [metadata, setPage]);


  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);

    if (descriptor.column) {
      const sortColumnName = headerColumns.find((column) => column.uid === descriptor.column)?.uid;
      const sortOrder = descriptor.direction === 'ascending' ? 'ASC' : 'DESC';
      Setsortcall(sortOrder);
      setRefresh(true);
    } else {
      console.log('Sort cleared');
    }
  };

  return (
    <div>


      <Table
        className=""
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[600px]",
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={handleSortChange}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          className="tablestyle"
        >
          {users.map((user: any, index: any) => (
            <TableRow key={index}>
              {headerColumns.map((column) => (
                <TableCell key={column.uid}>
                  <div data-column={column.name}>
                    {renderCell(user, column.uid, index)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>



      <div className="demos">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full"
          style={{
            marginLeft: window.innerWidth >= 1024 ? '55%' : '0', // Adjust margin for larger screens only
            width: window.innerWidth >= 1024 ? '45%' : '100%', // Set width for large vs small screens
          }}
          placement="top-center" className="modalclose inviteuser" isDismissable={false} isKeyboardDismissDisabled={true} >
          <ModalContent className="pt-10">
            {/* <ModalHeader className="flex flex-col gap-1">Invite User</ModalHeader> */}
            <Userprofile selectedUserId={selectedUserId || ''} Refreshdata={setRefresh} IsOpendata={setIsOpen} />
          </ModalContent>

        </Modal>
      </div >


    </div>

  );
}