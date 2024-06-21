"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { usePathname } from "next/navigation";

const BreadCrumbs = ({ names }: { names: string[] }) => {
  const path = usePathname() ?? "";
  const pathsArr = path.split("/").filter((x) => x !== "");
  return (
    <Container className="h-14 justify-start pl-5 mb-3">
      <Breadcrumb>
        <BreadcrumbList>
          {pathsArr.map((item, index) => {
            if (!names[index]) return null;
            return index + 1 === pathsArr.length ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg">{`${names[index]}`}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <React.Fragment key={item}>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {
                      <Link href={`/${item}`} className="text-lg no-underline">
                        {names[index]}
                      </Link>
                    }
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  );
};

export default React.memo(BreadCrumbs);
