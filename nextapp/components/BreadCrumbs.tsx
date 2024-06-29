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
import { cn } from "@/lib/utils";

const BreadCrumbs = ({ names }: { names: string[] }) => {
  const path = usePathname() ?? "";
  const pathsArr = path.split("/").filter((x) => x !== "");
  return (
    <Container className="h-14 justify-start pl-5 mb-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg" asChild>
              <Link
                href={`/`}
                className={cn("text-lg no-underline", {
                  "hover:cursor-default": path !== "/",
                  "hover:underline": path !== "/",
                })}
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight />
          </BreadcrumbSeparator>
          {pathsArr.map((item, index) => {
            if (!names[index]) return null;
            return index + 1 === pathsArr.length ? (
              <BreadcrumbItem key={item}>
                <BreadcrumbPage className="text-lg">{`${names[index]}`}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <React.Fragment key={item}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:underline">
                    <Link href={`/${item}`} className="text-lg no-underline">
                      {names[index]}
                    </Link>
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
