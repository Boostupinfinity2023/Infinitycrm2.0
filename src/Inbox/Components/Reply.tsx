import { useEffect, useRef, useState } from "react";
import { AjaxIntegration } from "../../APIurl/url";
import { ApiCall } from "../../APIurl/API_call";
import jwt from '../../getLoggedUser/GetUserInfomation';
import { message } from "antd";
export default function Reply(props: any) {


    const { className, email, setreply, userdata } = props
    const editorRef: any = useRef(null);
    const [content, setContent] = useState('');
    const execCommand = (command: any, value: any = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleFormat = (command: any) => {
        execCommand(command);
    };
    const handleLink = () => {
        const url = prompt('Enter URL:');
        if (url) execCommand('createLink', url);
    };

    const handleUnlink = () => {
        execCommand('unlink');
    };


    // Function to ensure proper list behavior when pressing enter
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            const selection: any = window.getSelection();
            const range = selection.getRangeAt(0);
            const startNode = range.startContainer;

            // Check if we're in a list item
            const listItem = startNode.closest('li');
            if (listItem && !listItem.textContent.trim()) {
                e.preventDefault();
                execCommand('outdent');
            }
        }
    };
    const token = jwt('jwt');
    const [isButtonloading, setisButtonloading] = useState(false);
    const HandleSubmit = async (event: any) => {
        event.preventDefault();
        setisButtonloading(true);
        const formdata = new FormData(event.target);
        formdata.append("email", email?.from)
        formdata.append("subject", email?.subject)
        formdata.append("body", content)
        formdata.append("reply_id", email?.id)
        try {
            const api = await ApiCall(`${AjaxIntegration}?action=reply-mail`, 'post', {
                Authenticate: `${token}`,
                'x-token-access': 'true',
            }, formdata);
            console.log('Mail sent response:', api);
            if (api.status) {
                message.success(api?.message)
                setreply(false);
            } else {
                message.error(api?.message)
            }

        } catch (error) {
            console.error('Error while sending mail:', error);
        }
        setisButtonloading(false);
    }

    const removeReply = () => {
        setreply(false);
    }

    const handleFontSize = (increase: boolean) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const parent = range.startContainer.parentElement as HTMLElement;

        // Get the current font size
        const currentSize = parseInt(window.getComputedStyle(parent).fontSize, 10);

        // Calculate new font size
        let newSize = increase ? currentSize + 2 : currentSize - 2;
        newSize = Math.max(10, Math.min(32, newSize)); // Limit between 10px and 32px

        // Apply the new font size
        if (parent.style.fontSize) {
            parent.style.fontSize = `${newSize}px`;
        } else {
            const span = document.createElement("span");
            span.style.fontSize = `${newSize}px`;
            span.appendChild(range.extractContents());
            range.insertNode(span);
        }
    };

    const fileInputRef: any = useRef(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const removeFile = () => {
        setPreview(null)
    }
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFileName(file.name);
        setFileType(file.type);
        // Handle image files
        if (file.type.startsWith("image/")) {
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
        }
        // Handle PDF files
        else if (file.type === "application/pdf") {
            const pdfURL = URL.createObjectURL(file);
            setPreview(pdfURL);
        }
        // Handle Word documents
        else if (
            file.type === "application/msword" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const wordURL = URL.createObjectURL(file);
            setPreview(wordURL);
        }
        // Handle Excel spreadsheets
        else if (
            file.type === "application/vnd.ms-excel" ||
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            const excelURL = URL.createObjectURL(file);
            setPreview(excelURL);
        }
        // Handle ZIP files
        else if (file.type === "application/zip" || file.type === "application/x-zip-compressed") {
            const zipURL = URL.createObjectURL(file);
            setPreview(zipURL);
        }
        // Handle TAR files
        else if (file.type === "application/x-tar") {
            const tarURL = URL.createObjectURL(file);
            setPreview(tarURL);
        }
        // Handle text files
        else if (file.type.startsWith("text/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsText(file);
        }
        else {
            setPreview("Unsupported file type.");
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    const [FileAttech, setFileAttech] = useState(false);
    const [EditorOptions, setEditorOptions] = useState(false);
    return (
        <>
            <div className={`${className} bg-white rounded-lg w-full p-4 flex items-start shadow-reply `} >
                <img alt="Profile picture of the sender" className="rounded-full w-10 h-10 mr-4" src={userdata?.ProfileUrl || "data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2238%22%20height%3D%2238%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2219%22%20r%3D%2219%22%20fill%3D%22%23828B95%22/%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M28.12%2023.816c0-.887-1.18-1.9-3.508-2.491a7.977%207.977%200%200%201-2.221-.992c-.15-.084-.127-.859-.127-.859l-.75-.112c0-.063-.063-.992-.063-.992.896-.296.804-2.04.804-2.04.57.31.94-1.07.94-1.07.674-1.92-.335-1.803-.335-1.803a11.847%2011.847%200%200%200%200-3.532c-.449-3.885-7.202-2.83-6.401-1.561-1.974-.357-1.524%204.05-1.524%204.05l.428%201.142c-.84.536-.256%201.183-.227%201.928.042%201.1.727.872.727.872.043%201.816.955%202.052.955%202.052.171%201.14.064.946.064.946l-.811.097c.01.259-.01.518-.064.773-.955.417-1.16.662-2.109%201.07-1.832.788-3.824%201.814-4.178%203.194-.354%201.38-.683%204.386-.683%204.386h20.077l-.993-5.058z%22/%3E%3C/g%3E%3C/svg%3E"} />
                <form onSubmit={HandleSubmit} className="w-full">
                    <div className="flex-1">
                        <div className="flex items-center mb-2 items-center justify-between">
                            <div>
                                <i className="fas fa-reply text-gray-500 mr-2">
                                </i>
                                <span className="text-gray-500 text-[13px] font-[400]">
                                    {email?.from}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-lg p-4 flex flex-col ">
                            <div ref={editorRef}
                                id="focussed-div"
                                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                onKeyDown={handleKeyDown}
                                className="w-full h-[auto] max-h-[300px] overflow-y-auto resize-none outline-none font-light rounded-lg p-2 mb-4" data-placeholder="Compose your email..." contentEditable></div>

                            {EditorOptions && (
                                <div className="bg-white shadow-md rounded-md p-2 flex items-center space-x-2 shadow-reply">
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFontSize(true)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFontSize(false)}>
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => execCommand('undo')} >
                                        <i className="fas fa-undo" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => execCommand('redo')}>
                                        <i className="fas fa-redo" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('bold')}>
                                        <i className="fas fa-bold" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('italic')}>
                                        <i className="fas fa-italic" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('underline')}>
                                        <i className="fas fa-underline" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Left')}>
                                        <i className="fas fa-align-left" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Center')}>
                                        <i className="fas fa-align-center" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Right')}>
                                        <i className="fas fa-align-right" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Full')}>
                                        <i className="fas fa-align-justify" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('bullet')}>
                                        <i className="fas fa-list-ul" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('number')}>
                                        <i className="fas fa-list-ol" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('indent')}>
                                        <i className="fas fa-indent" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('outdent')}>
                                        <i className="fas fa-outdent" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('formatBlock')}>
                                        <i className="fas fa-quote-right" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={handleLink} >
                                        <i className="fas fa-link" />
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={handleUnlink}  >
                                        <i className="fas fa-unlink" />
                                    </button>
                                </div>
                            )}


                            {FileAttech && (
                                <div className="">

                                    <div className="bg-[#f8f9fa] disk-user-field-panel-card-box disk-user-field-panel-card-file flex  gap-2">
                                        <div
                                            className="disk-user-field-panel-card disk-user-field-panel-card-icon--upload"
                                            onClick={handleClick}
                                        >
                                            <div className="disk-user-field-panel-card-content">
                                                <div className="disk-user-field-panel-card-icon" />
                                                <div className="disk-user-field-panel-card-btn" />
                                                <input
                                                    type="file"
                                                    name='FEED_FILE'
                                                    ref={fileInputRef}
                                                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt,.zip"
                                                    onChange={handleChangeFile}
                                                    className="disk-user-field-panel-card-file-input"
                                                    id="fileUpload"
                                                    style={{ display: 'none' }}
                                                />
                                                <div className="disk-user-field-panel-card-name font-Inter truncate mb-2">Upload</div>
                                            </div>
                                        </div>


                                        {preview && (
                                            <div className="preview-container">
                                                {fileType?.startsWith("image/") ? (
                                                    <div className="ui-tile-uploader-item ui-tile-uploader-item--complete --image ml-[15px]">
                                                        <div className="ui-tile-uploader-item-content">
                                                            <div className="ui-tile-uploader-item-remove" onClick={removeFile} />
                                                            <div className="ui-tile-uploader-item-preview">
                                                                <div
                                                                    className="ui-tile-uploader-item-image"
                                                                    style={{
                                                                        backgroundImage:
                                                                            `url("${preview}")`
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="ui-tile-uploader-item-name-box" title="IMG_5699.png">
                                                                <div className="ui-tile-uploader-item-name truncate">
                                                                    <span className="ui-tile-uploader-item-name-title">IMG_5699</span>
                                                                    <span className="ui-tile-uploader-item-name-extension">.png</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                ) : fileType?.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                    <div className="ui-tile-uploader-item ui-tile-uploader-item--complete">
                                                        <div className="ui-tile-uploader-item-content">
                                                            <div className="ui-tile-uploader-item-remove" onClick={removeFile} />
                                                            <div className="ui-tile-uploader-item-preview">
                                                                <div className="ui-tile-uploader-item-file-icon">
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="40.32px"
                                                                            viewBox="0 0 100 117"
                                                                            style={{ display: "block" }}
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="
                                                                            M 0 5
                                                                            c 0 0 0 -4 5 -5
                                                                            H 63
                                                                            l 26 28
                                                                            v 82
                                                                            c 0 0 0 4 -5 5
                                                                            h -79
                                                                            c 0 0 -4 0 -5 -5
                                                                            Z"
                                                                                fill="#e5e8eb"
                                                                            />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                opacity="0.3"
                                                                                d="
                                                                            M 63 0
                                                                            L 89 28
                                                                            H 66
                                                                            C 66 28 63 28 63 25
                                                                            V 63
                                                                            Z"
                                                                                fill="#535c69"
                                                                            />
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={65} height={33} x={35} y={53}>
                                                                                <rect width="100%" height={33} x={0} y={0} fill="#2c77b1" rx={2} ry={2} />
                                                                                <text
                                                                                    x="50%"
                                                                                    y="54%"
                                                                                    dominantBaseline="middle"
                                                                                    fill="#fff"
                                                                                    textAnchor="middle"
                                                                                    style={{
                                                                                        color: "#fff",
                                                                                        fontFamily:
                                                                                            '"OpenSans-Semibold", "Open Sans", Helvetica, Arial, sans-serif',
                                                                                        fontWeight: 500,
                                                                                        fontSize: 23,
                                                                                        lineHeight: 25
                                                                                    }}
                                                                                >
                                                                                    DOCX
                                                                                </text>
                                                                            </svg>
                                                                        </svg>

                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="ui-tile-uploader-item-name-box"
                                                                title="Khozzo Rooms Process Flow (1)-1.pdf"
                                                            >
                                                                <div className="ui-tile-uploader-item-name">
                                                                    <span className="ui-tile-uploader-item-name-title ">
                                                                        {fileName}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : fileType?.startsWith("application/x-zip-compressed") ? (
                                                    <div className="ui-tile-uploader-item ui-tile-uploader-item--complete">
                                                        <div className="ui-tile-uploader-item-content">
                                                            <div className="ui-tile-uploader-item-remove" onClick={removeFile} />
                                                            <div className="ui-tile-uploader-item-preview">
                                                                <div className="ui-tile-uploader-item-file-icon">
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="40.32px"
                                                                            viewBox="0 0 100 117"
                                                                            style={{ display: "block" }}
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="
                                                                            M 0 5
                                                                            c 0 0 0 -4 5 -5
                                                                            H 63
                                                                            l 26 28
                                                                            v 82
                                                                            c 0 0 0 4 -5 5
                                                                            h -79
                                                                            c 0 0 -4 0 -5 -5
                                                                            Z"
                                                                                fill="#e5e8eb"
                                                                            />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                opacity="0.3"
                                                                                d="
                                                                            M 63 0
                                                                            L 89 28
                                                                            H 66
                                                                            C 66 28 63 28 63 25
                                                                            V 63
                                                                            Z"
                                                                                fill="#535c69"
                                                                            />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M22.3214 0H27.7486V1.96417H22.3214V0ZM22.3214 3.57123H27.7486V5.5354H22.3214V3.57123ZM22.3214 7.14246H27.7486V9.10663H22.3214V7.14246ZM22.3214 10.5351H27.7486V12.4993H22.3214V10.5351ZM22.3214 14.1063H27.7486V16.0705H22.3214V14.1063ZM22.3214 17.6776H27.7486V19.6417H22.3214V17.6776ZM22.3214 21.2488H27.7486V23.213H22.3214V21.2488ZM22.3214 24.82H27.7486V26.7842H22.3214V24.82ZM22.3214 28.3913H27.7486V30.3554H22.3214V28.3913ZM22.3214 31.7839H27.7486V33.7481H22.3214V31.7839ZM22.3214 35.3552H27.7486V37.3193H22.3214V35.3552ZM22.3214 38.9264H27.7486V40.8906H22.3214V38.9264ZM29.4993 1.19209e-07H34.9265V1.96417H29.4993V1.19209e-07ZM29.4993 3.57123H34.9265V5.5354H29.4993V3.57123ZM29.4993 7.14246H34.9265V9.10663H29.4993V7.14246ZM29.4993 10.5351H34.9265V12.4993H29.4993V10.5351ZM29.4993 14.1063H34.9265V16.0705H29.4993V14.1063ZM29.4993 17.6776H34.9265V19.6417H29.4993V17.6776ZM29.4993 21.2488H34.9265V23.213H29.4993V21.2488ZM29.4993 24.82H34.9265V26.7842H29.4993V24.82ZM29.4993 28.3913H34.9265V30.3554H29.4993V28.3913ZM29.4993 31.7839H34.9265V33.7481H29.4993V31.7839ZM29.4993 35.3552H34.9265V37.3193H29.4993V35.3552ZM29.4993 38.9264H34.9265V40.8906H29.4993V38.9264Z"
                                                                                fill="#b9bec4"
                                                                            />
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={65} height={33} x={35} y={53}>
                                                                                <rect width="100%" height={33} x={0} y={0} fill="#ac5fbd" rx={2} ry={2} />
                                                                                <text
                                                                                    x="50%"
                                                                                    y="54%"
                                                                                    dominantBaseline="middle"
                                                                                    fill="#fff"
                                                                                    textAnchor="middle"
                                                                                    style={{
                                                                                        color: "#fff",
                                                                                        fontFamily:
                                                                                            '"OpenSans-Semibold", "Open Sans", Helvetica, Arial, sans-serif',
                                                                                        fontWeight: 500,
                                                                                        fontSize: 23,
                                                                                        lineHeight: 25
                                                                                    }}
                                                                                >
                                                                                    ZIP
                                                                                </text>
                                                                            </svg>
                                                                        </svg>

                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="ui-tile-uploader-item-name-box"
                                                                title="Khozzo Rooms Process Flow (1)-1.pdf"
                                                            >
                                                                <div className="ui-tile-uploader-item-name">
                                                                    <span className="ui-tile-uploader-item-name-title ">
                                                                        {fileName}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : fileType?.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                    <div className="ui-tile-uploader-item ui-tile-uploader-item--complete">
                                                        <div className="ui-tile-uploader-item-content">
                                                            <div className="ui-tile-uploader-item-remove" onClick={removeFile} />
                                                            <div className="ui-tile-uploader-item-preview">
                                                                <div className="ui-tile-uploader-item-file-icon">
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="40.32px"
                                                                            viewBox="0 0 100 117"
                                                                            style={{ display: "block" }}
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="
                                                                            M 0 5
                                                                            c 0 0 0 -4 5 -5
                                                                            H 63
                                                                            l 26 28
                                                                            v 82
                                                                            c 0 0 0 4 -5 5
                                                                            h -79
                                                                            c 0 0 -4 0 -5 -5
                                                                            Z"
                                                                                fill="#e5e8eb"
                                                                            />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                opacity="0.3"
                                                                                d="
                                                                            M 63 0
                                                                            L 89 28
                                                                            H 66
                                                                            C 66 28 63 28 63 25
                                                                            V 63
                                                                            Z"
                                                                                fill="#535c69"
                                                                            />
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={65} height={33} x={35} y={53}>
                                                                                <rect width="100%" height={33} x={0} y={0} fill="#54b51e" rx={2} ry={2} />
                                                                                <text
                                                                                    x="50%"
                                                                                    y="54%"
                                                                                    dominantBaseline="middle"
                                                                                    fill="#fff"
                                                                                    textAnchor="middle"
                                                                                    style={{
                                                                                        color: "#fff",
                                                                                        fontFamily:
                                                                                            '"OpenSans-Semibold", "Open Sans", Helvetica, Arial, sans-serif',
                                                                                        fontWeight: 500,
                                                                                        fontSize: 23,
                                                                                        lineHeight: 25
                                                                                    }}
                                                                                >
                                                                                    XLSX
                                                                                </text>
                                                                            </svg>
                                                                        </svg>

                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="ui-tile-uploader-item-name-box"
                                                                title="Khozzo Rooms Process Flow (1)-1.pdf"
                                                            >
                                                                <div className="ui-tile-uploader-item-name">
                                                                    <span className="ui-tile-uploader-item-name-title ">
                                                                        {fileName}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (

                                                    <div className="ui-tile-uploader-item ui-tile-uploader-item--complete">
                                                        <div className="ui-tile-uploader-item-content">
                                                            <div className="ui-tile-uploader-item-remove" onClick={removeFile} />
                                                            <div className="ui-tile-uploader-item-preview">
                                                                <div className="ui-tile-uploader-item-file-icon">
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="40.32px"
                                                                            viewBox="0 0 100 117"
                                                                            style={{ display: "block" }}
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="
                                                                        M 0 5
                                                                        c 0 0 0 -4 5 -5
                                                                        H 63
                                                                        l 26 28
                                                                        v 82
                                                                        c 0 0 0 4 -5 5
                                                                        h -79
                                                                        c 0 0 -4 0 -5 -5
                                                                        Z"
                                                                                fill="#e5e8eb"
                                                                            />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                opacity="0.3"
                                                                                d="
                                                                            M 63 0
                                                                            L 89 28
                                                                            H 66
                                                                            C 66 28 63 28 63 25
                                                                            V 63
                                                                            Z"
                                                                                fill="#535c69"
                                                                            />
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={65}
                                                                                height={33}
                                                                                x={35}
                                                                                y={53}
                                                                            >
                                                                                <rect
                                                                                    width="100%"
                                                                                    height={33}
                                                                                    x={0}
                                                                                    y={0}
                                                                                    fill="#d73b41"
                                                                                    rx={2}
                                                                                    ry={2}
                                                                                />
                                                                                <text
                                                                                    x="50%"
                                                                                    y="54%"
                                                                                    dominantBaseline="middle"
                                                                                    fill="#fff"
                                                                                    textAnchor="middle"
                                                                                    style={{
                                                                                        color: "#fff",
                                                                                        fontFamily:
                                                                                            '"OpenSans-Semibold", "Open Sans", Helvetica, Arial, sans-serif',
                                                                                        fontWeight: 500,
                                                                                        fontSize: 23,
                                                                                        lineHeight: 25
                                                                                    }}
                                                                                >
                                                                                    PDF
                                                                                </text>
                                                                            </svg>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="ui-tile-uploader-item-name-box"
                                                                title="Khozzo Rooms Process Flow (1)-1.pdf"
                                                            >
                                                                <div className="ui-tile-uploader-item-name">
                                                                    <span className="ui-tile-uploader-item-name-title ">
                                                                        {fileName}
                                                                    </span>
                                                                    <span className="ui-tile-uploader-item-name-extension">.pdf</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}




                            <div className="flex items-center mt-4">
                                <button type="submit" disabled={isButtonloading} className="bg-[#3690e7] text-white px-4 py-2 rounded-full mr-2 font-[400]">
                                    {isButtonloading ? 'sending...' : 'Send'}
                                </button>
                                <div className={` flex-1 flex items-center space-x-4 text-gray-500 ml-4 `} >
                                    <i className={` ${EditorOptions && 'text-[#20568a]'} cursor-pointer fas fa-font `} onClick={() => setEditorOptions((preview: boolean) => !preview)}>
                                    </i>
                                    <i className={` cursor-pointer fas fa-paperclip ${FileAttech && 'text-[#20568a]'} `} onClick={() => setFileAttech((preview: boolean) => !preview)}>
                                    </i>
                                    <i className="cursor-pointer fas fa-link">
                                    </i>
                                    <i className="cursor-pointer fas fa-smile">
                                    </i>
                                    <i className="cursor-pointer fas fa-image">
                                    </i>
                                    <i className="cursor-pointer fas fa-lock">
                                    </i>
                                    <i className="cursor-pointer fas fa-pen">
                                    </i>
                                    <i className="cursor-pointer fas fa-ellipsis-h">
                                    </i>
                                </div>
                                <i className="fas fa-trash text-gray-500 ml-4 cursor-pointer" onClick={removeReply}></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}