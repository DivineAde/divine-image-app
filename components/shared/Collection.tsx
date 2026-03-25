"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      {/* Section header */}
      <div className="collection-heading">
        <div>
          <h2 className="text-[20px] font-semibold tracking-tight" style={{ color: '#111827', letterSpacing: '-0.01em' }}>
            Recent Edits
          </h2>
          {images?.length > 0 && (
            <p className="text-[13px] mt-0.5" style={{ color: '#9ca3af' }}>
              {images.length} transformation{images.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {hasSearch && <Search />}
      </div>

      {/* Grid or empty state */}
      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#9ca3af" strokeWidth="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="#9ca3af"/>
                <path d="M21 15l-5-5L5 21" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold" style={{ color: '#374151' }}>No images yet</p>
              <p className="text-[13px] mt-0.5" style={{ color: '#9ca3af' }}>Upload an image to get started</p>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full items-center justify-between">
            <Button
              disabled={Number(page) <= 1}
              className="rounded-lg px-5 py-2 text-sm font-medium transition-all"
              style={{
                background: '#ffffff',
                color: '#374151',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-inherit" />
            </Button>

            <p className="flex-center text-[13px] font-medium w-fit flex-1" style={{ color: '#6b7280' }}>
              Page {page} of {totalPages}
            </p>

            <Button
              className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all"
              style={{
                background: '#111827',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  const typeKey = image.transformationType as TransformationTypeKey;
  const typeData = transformationTypes[typeKey];

  return (
    <li>
      <Link href={`/transformations/${image._id}`} className="collection-card group">
        {/* Image with hover zoom */}
        <div className="relative overflow-hidden rounded-xl bg-gray-50" style={{ border: '1px solid #f3f4f6' }}>
          <CldImage
            src={image.publicId}
            alt={image.title}
            width={image.width}
            height={image.height}
            {...image.config}
            loading="lazy"
            className="h-52 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
          {/* Type tag */}
          {typeData && (
            <div
              className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize"
              style={{
                background: 'rgba(9,9,15,0.75)',
                backdropFilter: 'blur(6px)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Image
                src={`/assets/icons/${typeData.icon}`}
                alt={typeData.title}
                width={11}
                height={11}
                style={{ filter: 'brightness(10)' }}
              />
              {image.transformationType}
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between px-1 pt-0.5 pb-0.5">
          <p className="text-[14px] font-semibold line-clamp-1 mr-2" style={{ color: '#111827' }}>
            {image.title}
          </p>
          <svg
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </li>
  );
};