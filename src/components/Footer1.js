import Link from "next/link";
import React from "react";
import Styles from "./Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer1() {
  return (
    <div>
      <div className={Styles.columnFooter}>
        <div className={Styles.columnFooterRow}>
          <div className={Styles.columnFooterColumn}>
            <Link className={Styles.fwBold} href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className={Styles.fwBold} href="/terms-conditions">
              Terms & Conditions
            </Link>
            <Link className={Styles.fwBold} href="/disclaimer">
              Disclaimer
            </Link>
          </div>
          <hr className={Styles.hr} />
          <div className={Styles.columnFooterColumnLink}>
            <div className={Styles.columnFooterColumnInner}>
              <p>
                <strong>Head Office : Chennai</strong>
              </p>
              <li>
                <FaMapMarkerAlt size={15} />{" "}
                <span>
                  MF-1, Industrial Estate, CIPET Hostel Road, Guindy, Chennai-
                  600032
                </span>
              </li>
              <li>
                <FaPhoneAlt size={15} />
                <span>
                  <Link href="tel:04469199999">044-69199999</Link>
                </span>
              </li>
              <li>
                <MdEmail size={15} />
                <span>
                  <Link href="mailto:info@olipl.com">info@olipl.com</Link> /
                  <Link href="mailto:contracts@olipl.com">
                    contracts@olipl.com
                  </Link>
                </span>
              </li>
            </div>
            <div className={Styles.columnFooterColumnInner}>
              <p>
                <strong>Branch Office: Bangalore</strong>
              </p>
              <li>
                <FaMapMarkerAlt size={15} />{" "}
                <span>
                  No.748/2, Shri Krishna Temple Road, HAL 1st Stage,
                  Indiranagar, Bengaluru, Karnataka, 560038
                </span>
              </li>
              <li>
                <FaPhoneAlt size={15} />
                <span>
                  <Link href="tel:08025201561">080-25201561</Link> /{" "}
                  <Link href="tel:08069211500">080-69211500</Link>
                </span>
              </li>
              <li>
                <MdEmail size={15} />
                <span>
                  <Link href="mailto:info@olipl.com">info@olipl.com</Link> /{" "}
                  <Link href="mailto:infoblr@olipl.com">infoblr@olipl.com</Link>
                </span>
              </li>
            </div>
            <div className={Styles.columnFooterColumnInner}>
              <p>
                <strong>Branch Office: Hyderabad</strong>
              </p>
              <li>
                <FaMapMarkerAlt size={15} />{" "}
                <span>
                  102/11,103/10&104/9, Ground Floor, Boss Tower, Patrika Nagar,
                  Madhapur, Hyderabad – 500081
                </span>
              </li>
              <li>
                <FaPhoneAlt size={15} />
                <span>
                  <Link href="tel:04040402000">040-40402000</Link> /{" "}
                  <Link href="tel:04040402042">42</Link>
                </span>
              </li>
              <li>
                <MdEmail size={15} />
                <span>
                  <Link href="mailto:info@olipl.com">info@olipl.com</Link>
                </span>
              </li>
            </div>
          </div>
        </div>
        <div className={Styles.columnFooterRow}>
          <p>
            Copyright © 2025 Ocean Lifespaces India Private Limited. Designed by
            Tectra Technologies.
          </p>
          <div className={Styles.social}>
            <Link
              href="https://www.instagram.com/oceanlifespaces/"
              target="blank"
            >
              <FaInstagram />
            </Link>

            <Link
              href="https://www.facebook.com/people/Ocean-Lifespaces-India/61563886268688/?sk=reels_tab"
              target="blank"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://www.linkedin.com/company/ocean-life-spaces-private-limited/posts/?feedView=all"
              target="blank"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer1;
