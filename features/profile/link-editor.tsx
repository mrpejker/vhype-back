/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import LinkMeta from './link-meta';
import { isStringEmpty, isValidHttpUrl } from '../../utils';
import { LinkData } from '../../models/vRanda';

interface LinkEditorProps {
  submitLink: (link: LinkData) => void;
  linkToEdit?: LinkData;
}

const emptyLink: LinkData = { title: '', url: '', meta: undefined };

const LinkEditor: React.FC<LinkEditorProps> = ({ submitLink, linkToEdit = emptyLink }) => {
  const [link, setLink] = useState<LinkData>(linkToEdit);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { title, meta, url } = link;

  // Parsing links to get meta data
  const getUrlMeta = async (value: string) => {
    try {
      setErrorMsg(null);
      const isValid = isValidHttpUrl(value);
      const { data } = await axios.get('/api/parse-links?link=' + value);
      if (!data.error) {
        setLink((prevLink) => ({ ...prevLink, meta: data, title: prevLink.title || data.title, url: value }));
      }
      if (!isValid) {
        const { data } = await axios.get('/api/parse-links?link=https://' + value);
        if (!data.error) {
          setLink((prevLink) => ({ ...prevLink, meta: data, title: prevLink.title || data.title, url: value }));
        }
      }
    } catch (err) {
      console.log('err', err);
      setLink((prevLink) => ({ ...prevLink, title: value, url: value }));
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce function to prevent multiple requests
  const debouncedGetUrlMeta = useCallback(debounce(getUrlMeta, 1000), []);

  // Fetching link meta data
  useEffect(() => {
    if (url) {
      setIsLoading(true);
      debouncedGetUrlMeta(url);
    }
  }, [url]);

  // Handle link change
  const handleLinkChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLink((prevLink) => ({ ...prevLink, url: value }));
  };

  const handleLinkTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLink((prevLink) => ({ ...prevLink, title: value }));
  };

  const handleSubmit = () => {
    if (isStringEmpty(url === null ? '' : url)) {
      return;
    }

    if (isStringEmpty(title === null ? '' : title)) {
      submitLink({ ...link, title: url });
    } else {
      submitLink(link);
    }
  };

  return (
    <div className="flex flex-col sm:min-w-[400px] text-left text-[#3D3D3D]">
      <p className="font-drukMedium uppercase text-black mb-4">Provide link you want to share</p>
      <input
        autoComplete="off"
        placeholder="Title"
        name="newlink"
        onChange={handleLinkTitleChange}
        value={title === null ? undefined : title}
        type="text"
        className={`outline-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
          errorMsg ? 'border-red-600' : 'border-gray-300'
        } rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
      />
      <input
        autoComplete="off"
        placeholder="Link"
        name="newlink"
        onChange={handleLinkChange}
        value={url === null ? undefined : url}
        type="text"
        className={`outline-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
          errorMsg ? 'border-red-600' : 'border-gray-300'
        } rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
      />
      {Boolean(errorMsg) && <p className="text-red-600 my-4">{String(errorMsg)}</p>}
      <LinkMeta {...meta} loading={isLoading} />
      <button
        onClick={handleSubmit}
        type="button"
        className="mt-4 self-end px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </div>
  );
};

export default LinkEditor;
