import { DatePicker, Select } from 'antd';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { TbListDetails } from 'react-icons/tb';

import MediaAddNew from '../add_new';

const { RangePicker } = DatePicker;

type propTypes = {
  selectedRowKeys?: any;
  setSelectedRowKeys?: any;
  filtered?: any;
  setFiltered?: any;
  alignment?: any;
  setAlignment?: any;
  isMediaInput?: any;
  type?: any;
};

const MediaFilter = ({
  setFiltered,
  filtered,
  alignment,
  setAlignment,
  isMediaInput,
  type,
}: propTypes) => {
  // const [deletIds] = useBulkDeleteMediaMutation();
  const [dateRange, setDateRange] = useState<any>([]);

  // const confirm = async (ids: any) => {
  //   const idsArray = ids.join(",");
  //   try {
  //     const res: any = await deletIds({
  //       ids: idsArray,
  //     });
  //     if (!res?.error) {
  //       message.success("Media delete successfully.");
  //       setSelectedRowKeys([]);
  //     } else {
  //       if (res?.error?.status >= 500) {
  //         message.error("Somthing went wrong.");
  //       } else {
  //         message.error(
  //           `${
  //             res?.error?.data?.message
  //               ? res?.error?.data?.message
  //               : "Somthing went wrong"
  //           }`
  //         );
  //       }
  //     }
  //   } catch (err) {}
  // };

  return (
    <div className="mb-2 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-[10px] top-[50%] -translate-y-[50%] text-[#9ca3af]" />
            <input
              type="text"
              name="title"
              placeholder="Search by Name"
              className="w-full border py-[5px] pl-8 pr-4 text-sm  placeholder:text-[#364a6340]"
              onChange={(e: any) => {
                setFiltered((prevState: any) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              value={filtered.title ?? ''}
            />
          </div>

          <Select
            disabled={!!type}
            className="media_search_select h-[32px] w-[150px] rounded-sm text-sm placeholder:text-sm"
            allowClear
            showSearch
            placeholder="File Type"
            onChange={(val: any) =>
              setFiltered((prevState: any) => ({
                ...prevState,
                type: val,
              }))}
            options={[
              {
                value: 'image',
                label: 'Image',
              },
              {
                value: 'video',
                label: 'Video',
              },
              {
                value: 'doc',
                label: 'DOC',
              },
            ]}
            value={filtered.type ?? undefined}
          />

          <div className="max-w-[240px]">
            <RangePicker
              value={dateRange}
              className="media_search_date"
              onChange={(data: any, dateString) => {
                setDateRange(data);
                setFiltered((prevState: any) => ({
                  ...prevState,
                  startDate: dateString[0],
                  endDate: dateString[1],
                }));
              }}
            />
          </div>

          <button
            onClick={() => {
              setFiltered({
                searchString: '',
                startDate: null,
                endDate: null,
                category: '',
                type: undefined,
              });
              setDateRange([]);
            }}
            type="button"
            className="btn btn-grey py-[6px]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xl">
        {/* {selectedRowKeys.length > 0 && (
          <Popconfirm
            placement="top"
            title={<span>Are you sure to delete this file?</span>}
            description=""
            onConfirm={() => confirm(selectedRowKeys)}
            okText={"Yes"}
            cancelText="No"
          >
            <button className={`btn bg-[#FF0000] text-white`}>Delete</button>
          </Popconfirm>
        )} */}

        {!isMediaInput
          ? (
              <>
                <button
                  onClick={() => setAlignment('grid')}
                  type="button"
                  className={`border-grey hover:bg-greylight rounded border p-2 transition-all hover:border-transparent ${
                    alignment === 'grid' ? 'bg-greylight' : ''
                  }`}
                >
                  <RxDashboard />
                </button>
                <button
                  onClick={() => setAlignment('list')}
                  type="button"
                  className={`border-grey hover:bg-greylight rounded border p-2 transition-all hover:border-transparent ${
                    alignment === 'list' ? 'bg-greylight' : ''
                  }`}
                >
                  <TbListDetails />
                </button>
              </>
            )
          : null}

        <div className="ml-2">
          <MediaAddNew />
        </div>
      </div>
    </div>
  );
};

export default MediaFilter;
