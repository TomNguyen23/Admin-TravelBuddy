import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faFileLines, faUser, faBan, faCheck, faShapes, faChevronDown, faChevronUp, faPhotoFilm, faXmark } from '@fortawesome/free-solid-svg-icons';
import apis from '@/APIs/APIs';
import axiosInstance from '../../services/axios/custom-axios';
import { Button } from '@/components/ui/button';
import dateTimeFormat from '@/assets/js/formatter';
import { dowShortEnum } from '@/assets/js/formatter';
import SpanedLabel from '@/components/others/spanedLabel';
import numeral from 'numeral';

const PartHeader = ({ icon, title }) => {
    return (
        <div className="flex text-md text-blue-900">
            <div className="text-xs font-bold uppercase flex items-center">
                <FontAwesomeIcon icon={icon} size='lg' className='pr-1' style={{ width: '24px' }} />
            </div>
            <h2 className="font-bold text-lg">{title}</h2>
        </div>
    )
}

const SiteTypeSpanedLabel = ({ value }) => {
    let mode = "N/A";
    if (value.attraction == true && value.amenity == true) {
        mode = "Chung";
    } else if (value.attraction == true) {
        mode = "Địa điểm lịch";
    } else if (value.amenity == true) {
        mode = "Tiện ích";
    }
    return (
        <div>
            <SpanedLabel value={mode} bgColor={"bg-pltC-blue mr-2 ml-2"} />
        </div>
    )
}

const SiteDetail = () => {
    const [data, setData] = useState({
        "siteId": "N/A",
        "siteVersionId": "N/A",
        "ownerId": "N/A",
        "ownerUsername": "N/A",
        "siteName": "N/A",
        "lat": "N/A",
        "lng": "N/A",
        "resolvedAddress": "N/A",
        "website": "N/A",
        "createdAt": "N/A",
        "siteType": {
            "id": "N/A",
            "name": "N/A",
            "attraction": "N/A",
            "amenity": "N/A"
        },
        "phoneNumbers": [],
        "groupedServices": [],
        "openingTimes": [],
        "fees": [],
        "medias": []
    });
    const [currentID, setCurrentID] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedGroup, setExpandedGroup] = useState(null);

    const toggleGroup = (groupName) => {
        setExpandedGroup(expandedGroup === groupName ? null : groupName);
    };

    const fetchInformations = async (id) => {
        try {
            const response = await axiosInstance.get(`${apis.forceGetSiteVersionDetails.urls}${id}`);
            console.log(response.data);
            setData(response.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(error);
            setLoading(false); // Set loading to false even if there is an error
        }
    }

    const handlePictureClick = (url, index) => {
        if (document.getElementById('view-overlay') == null) return;
        document.getElementById('view-overlay').style.display = 'block';
        document.getElementById('img-view-overlay').src = url;
        document.getElementById('index-view-overlay').innerText = `${index + 1}/${data.medias.length}`;
    }

    const handleCloseOverlay = () => {
        if (document.getElementById('view-overlay') == null) return;
        document.getElementById('view-overlay').style.display = 'none';
    }

    useEffect(() => {
        let currentID = window.location.pathname.split("/").pop();
        setCurrentID(currentID);
        if (currentID) {
            fetchInformations(currentID);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while data is being fetched
    }

    return (
        <div>
            <div className="bg-white border shadow-lg rounded-md text-2xl text-center absolute right-0 top-28 left-0 mx-12 my-7 p-2 pb-10">
                <div className='flex'>
                    <div className="px-3 py-5 text-left">
                        {/* left part */}
                        <h1 className="font-bold">Kiểm duyệt bài đăng</h1>
                        <div className="flex mt-2">
                            <text className="text-sm text-gray-700">ID phiên bản: {data.siteVersionId}</text>
                            <text className="ml-10 text-sm text-gray-700">ID địa điểm: {data.siteId}</text>
                            <text className="ml-10 text-sm text-gray-700">ID kiểm duyệt: {currentID}</text>
                        </div>
                        {/* // TODO: Implement sort */}
                        {/* <p className="text-sm">Sắp xếp theo:</p> */}
                    </div>
                    <div className='px-3 py-5 text-left flex flex-row-reverse mr-0 ml-auto'>
                        {/* right part */}
                        <Button className="mr-1 bg-pltA-yellow text-gray-900">
                            <div className="text-xs font-bold uppercase flex items-center">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} size='lg' className='pr-2' style={{ width: '24px' }} />
                            </div> Thoát
                        </Button>
                        <Button className="mr-1 bg-pltB-red">
                            <div className="text-xs font-bold uppercase flex items-center">
                                <FontAwesomeIcon icon={faBan} size='lg' className='pr-2' style={{ width: '24px' }} />
                            </div> Từ chối
                        </Button>
                        <Button className="mr-1 bg-pltA-green ">
                            <div className="text-xs font-bold uppercase flex items-center">
                                <FontAwesomeIcon icon={faCheck} size='lg' className='pr-2' style={{ width: '24px' }} />
                            </div>
                            Chấp nhận
                        </Button>
                    </div>
                </div>

                <div className="flex h-full">
                    <div className="w-1/2 px-4 border-r">
                        {/* Left part content */}
                        <div className="mb-3">
                            <PartHeader icon={faUser} title="Thông tin chủ sở hữu" />
                            <p className="text-base text-left ml-8 mt-1"><strong>Chủ sở hữu: </strong>{data.ownerUsername}</p>
                        </div>

                        <div>
                            <PartHeader icon={faFileLines} title="Nội dung địa điểm" />
                            <p className="text-base text-left ml-8 mt-1"><strong>Tên địa điểm</strong>: {data.siteName}</p>
                            <p className="text-base text-left ml-8 mt-1"><strong>Vị trí: </strong> ({data.lat}, {data.lng}) <a href={`https://www.google.com/maps/place/${data.lat}+${data.lng}`} className="text-blue-900 underline" target="_blank">Xem trên bản đồ</a></p>
                            <p className="text-base text-left ml-8 mt-1"><strong>Địa chỉ</strong>: {data.resolvedAddress}</p>
                            <p className="text-base text-left ml-8 mt-1 overflow-hidden whitespace-nowrap overflow-ellipsis"><strong>Website: </strong>
                                {
                                    data.website != "null" ? <a href={`${data.website}`} className="underline text-blue-900">{data.website}</a> : "N/A"
                                }
                            </p>
                            <p className="text-base text-left ml-8 mt-1"><strong>Ngày tạo</strong>: {dateTimeFormat(data.createdAt)}</p>
                            <p className="text-base text-left ml-8 mt-1"><strong>Số điện thoại</strong>: {data.phoneNumbers.join(', ')}</p>
                            <div className="flex">
                                <div className="">
                                    <p className="text-base text-left ml-8 mt-1"><strong>Thời gian mở cửa: </strong></p>
                                </div>
                                <div className="">
                                    {data.openingTimes.length > 0 ? (
                                        data.openingTimes.map((time, index) => (
                                            <p className="text-base text-left ml-8 mt-1" key={index}><SpanedLabel value={dowShortEnum(time.dayOfWeek)} bgColor={"bg-pltC-blue mr-2 font-mono"} /> {time.openTime} - {time.closeTime}</p>
                                        ))
                                    ) : (
                                        <p className="text-base text-left mt-1 ml-1">N/A</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="">
                                    <p className="text-base text-left ml-8 mt-2"><strong>Chi phí: </strong></p>
                                </div>
                                <div className="">
                                    {data.fees.length > 0 ? (
                                        data.fees.map((fee, index) => (
                                            <p className="text-base text-left ml-8 mt-2" key={index}>{fee.aspect.aspectName}: {numeral(fee.feeLow).format(0, 0)} ₫ - {numeral(fee.feeHigh).format(0, 0)} ₫</p>
                                        ))
                                    ) : (
                                        <p className="text-base text-left mt-2 ml-1"> N/A</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 px-4">
                        {/* Right part content */}
                        <div className="mb-3">
                            <PartHeader icon={faShapes} title="Danh mục và các dịch vụ" />
                            <p className="text-base text-left ml-8 mt-1 flex"><strong className="pr-1">Loại hình: </strong>{data.siteType.name} <SiteTypeSpanedLabel value={data.siteType} /></p>

                            {
                                data.groupedServices.length > 0 ? (
                                    <p className="text-base text-left ml-8 mt-1 flex"><strong>Các dịch vụ: </strong></p>,
                                    data.groupedServices.map((serviceGroup) => (
                                        <div key={serviceGroup.serviceGroup.serviceGroupName}>
                                            <p className="mx-8 text-base flex justify-between items-center cursor-pointer" onClick={() => toggleGroup(serviceGroup.serviceGroup.serviceGroupName)}>
                                                {serviceGroup.serviceGroup.serviceGroupName.toString()}
                                                <FontAwesomeIcon icon={expandedGroup === serviceGroup.serviceGroup.serviceGroupName ? faChevronUp : faChevronDown} />
                                            </p>
                                            {expandedGroup === serviceGroup.serviceGroup.serviceGroupName && (
                                                <div className="ml-8 mt-1">
                                                    <ol className="list-decimal list-inside">
                                                        {serviceGroup.services.map((service, serviceIndex) => (
                                                            <li className="text-base text-left text-blue-700" key={serviceIndex}>{service.serviceName}</li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-base text-left ml-8 mt-1 flex"><strong className="pr-1">Các dịch vụ: </strong> N/A</p>
                                )}
                        </div>
                    </div>
                </div>

                <div className="flex h-full px-4 mb-3 flex-col mt-5">
                    <div className="mb-2 flex">
                        <PartHeader icon={faPhotoFilm} title={"Đa phương tiện tải lên"} />
                    </div>
                    <div className="flex">
                        {data.medias.length > 0 ? (
                            data.medias.map((media, index) => (
                                <div>
                                    <div className="flex flex-col cursor-pointer" key={index} onClick={() => handlePictureClick(media.url, index)}>
                                        <div className="p-36 rounded-md mr-1" style={{
                                            backgroundImage: `url(${media.url})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}>
                                        </div>
                                        <span className="text-gray-800 bg-white px-2 py-1 relative text-base top-[-2.5rem] left-[0.5rem] shadow-md rounded-md w-fit">{index + 1}/{data.medias.length}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-base text-left ml-8 mt-1">N/A</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.85)] z-10 items-center justify-center hidden" id="view-overlay">
                <FontAwesomeIcon icon={faXmark} size='lg' className='text-white absolute top-8 right-8 cursor-pointer' onClick={() => handleCloseOverlay()} />
                <div className="flex flex-col w-screen h-screen p-10 items-center justify-center">
                    <img id="img-view-overlay" src="" alt="Không thể mở ảnh ngay lúc này, hãy thử lại sau..." className="max-w-full max-h-full" />
                    <span id="index-view-overlay" className="text-gray-800 bg-white px-2 py-1 relative text-base shadow-md rounded-md w-fit mt-3"></span>
                </div>
            </div>
        </div>
    );
}

export default SiteDetail;