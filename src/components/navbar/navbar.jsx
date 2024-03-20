import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import logo from "../assets/Images/logo.png";
import makeBlockie from "ethereum-blockies-base64";
import axios from "axios";
import TokenContext from "../assets/TokenContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [blockieImage, setBlockieImage] = useState("");
    const { tokenBalance, setTokenBalance } = useContext(TokenContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDisconnectModal, setShowDisconnectModal] = useState(false);
    const toggleDisconnectModal = () => {
        setShowDisconnectModal(!showDisconnectModal);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    // Function to format the wallet address for display
    const formatAddress = (address) =>
        address
            ? `${address.substring(0, 6)}...${address.substring(
                  address.length - 4
              )}`
            : "";

    // Function to fetch token balance from BscScan
    const fetchTokenBalance = async (walletAddress) => {
        const apiKey = "JUDPV627WC6YPRF9PJ992PQ4MMAIZVCDVV"; // Replace with your BscScan API key
        const contractAddress = "0x79601100c4b8089a354ab413810dea3d9040306d"; // The contract address for the token
        const url = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${walletAddress}&tag=latest&apikey=${apiKey}`;

        try {
            const response = await axios.get(url);
            if (response.data && response.data.result) {
                const balance = response.data.result / 1e18; // Adjust based on the token's decimals
                setTokenBalance(balance);
            }
        } catch (error) {
            console.error("Error fetching token balance:", error);
            setTokenBalance(0);
        }
    };

    // Connect to MetaMask wallet
    const handleConnectWallet = async () => {
        if (window.ethereum && typeof window.ethereum.request === "function") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
                setIsConnected(true);
                setBlockieImage(makeBlockie(accounts[0]));
                fetchTokenBalance(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert(
                "MetaMask is not installed or your browser does not support Ethereum wallets."
            );
        }
    };

    // Effect hook to check if a wallet is already connected and to handle account changes
    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (
                window.ethereum &&
                typeof window.ethereum.request === "function"
            ) {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                    setBlockieImage(makeBlockie(accounts[0]));
                    // Fetch token balance on component mount if already connected
                    fetchTokenBalance(accounts[0]);
                }
            } else {
                console.log(
                    "Ethereum wallet integration not supported on this browser."
                );
            }
        };

        checkIfWalletIsConnected();

        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                setIsConnected(true);
                setBlockieImage(makeBlockie(accounts[0]));
                fetchTokenBalance(accounts[0]);
            } else {
                setIsConnected(false);
                setAccount("");
                setBlockieImage("");
                setTokenBalance(0);
            }
        };

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
        }

        // Cleanup function
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener(
                    "accountsChanged",
                    handleAccountsChanged
                );
            }
        };
    }, [setTokenBalance]);
    return (
        <div>
            <nav className=" backdrop-blur-3xl hover:text-black">
                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        <img
                            src={logo}
                            alt=""
                            className=" h-12  my-auto ml-5"
                        />
                        <div className="my-auto">
                            <Link to="/">
                                <span className=" text-3xl">BLOCKFILE</span>
                            </Link>
                        </div>
                        <div className="md:hidden absolute right-0 pr-4 mt-2">
                            <button onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? (
                                    <FaTimes size={24} />
                                ) : (
                                    <FaBars size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${
                            isMobileMenuOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6`}>
                        {!isConnected ? (
                            <div className="p-2 hidden lg:block">
                                <button
                                    type="button"
                                    onClick={handleConnectWallet}
                                    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <svg
                                        aria-hidden="true"
                                        class="w-6 h-5 me-2 -ms-1"
                                        viewBox="0 0 2405 2501"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        {" "}
                                        <g clip-path="url(#clip0_1512_1323)">
                                            {" "}
                                            <path
                                                d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z"
                                                fill="#E2761B"
                                                stroke="#E2761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z"
                                                fill="#E2761B"
                                                stroke="#E2761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z"
                                                fill="#E2761B"
                                                stroke="#E2761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z"
                                                fill="#233447"
                                                stroke="#233447"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z"
                                                fill="#D7C1B3"
                                                stroke="#D7C1B3"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z"
                                                fill="#D7C1B3"
                                                stroke="#D7C1B3"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z"
                                                fill="#233447"
                                                stroke="#233447"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                        </g>{" "}
                                        <defs>
                                            {" "}
                                            <clipPath id="clip0_1512_1323">
                                                {" "}
                                                <rect
                                                    width="2404"
                                                    height="2500"
                                                    fill="white"
                                                    transform="translate(0.519043 0.132812)"
                                                />{" "}
                                            </clipPath>{" "}
                                        </defs>{" "}
                                    </svg>
                                    Connect with MetaMask
                                </button>
                            </div>
                        ) : (
                            <ul className="flex space-x-5 text-xl mt-2 justify-end mr-2 ">
                                <li className=" border-1   hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 w-[250px] h-[43px] hidden lg:block rounded-lg text-sm text-center  items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  mb-2">
                                    <div className="flex space-x-2 pl-5 my-2 ">
                                        <div>
                                            <img
                                                src={logo}
                                                alt="emptylogo"
                                                className="h-7 w-7 mb-2 rounded-full"
                                            />
                                        </div>
                                        <span className="  text-xl shadow-2xl mb-1 ">
                                            {tokenBalance.toFixed(0)}
                                        </span>
                                        <span className="  text-xl shadow-2xl mb-1 ">
                                            BLK
                                        </span>
                                    </div>
                                </li>
                                <li className=" border-1 cursor-pointer   hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 w-[250px] h-[43px] hidden lg:block rounded-lg text-sm text-center  items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  mb-2">
                                    <div className="flex space-x-2 ml-10 my-2  ">
                                        <div>
                                            <img
                                                src={blockieImage}
                                                alt="emptylogo"
                                                className="h-7 w-7 mb-2 rounded-full cursor-pointer"
                                            />
                                        </div>
                                        <span className="  text-xl shadow-2xl mb-1 ">
                                            {formatAddress(account)}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            {isMobileMenuOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={toggleMobileMenu}
                        className="fixed top-0 left-0 w-full h-full backdrop-blur-xl bg-black bg-opacity-50 z-40 "></div>

                    {/* Menu Items */}
                    <ul className="fixed top-0 right-0 left-0 mt-2 mr-2 flex flex-col space-y-4 text-xl z-50 p-4 items-center font-anta">
                        <div className="flex justify-between">
                            <div className="flex space-x-2">
                                <img
                                    src={logo}
                                    alt=""
                                    className=" h-12  my-auto "
                                />
                                <div className="my-auto">
                                    <span className=" text-3xl">BLOCKFILE</span>
                                </div>
                            </div>
                        </div>
                        {!isConnected ? (
                            <li className="w-full">
                                <button
                                    onClick={handleConnectWallet}
                                    className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                    <svg
                                        aria-hidden="true"
                                        class="w-6 h-5 me-2 -ms-1"
                                        viewBox="0 0 2405 2501"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        {" "}
                                        <g clip-path="url(#clip0_1512_1323)">
                                            {" "}
                                            <path
                                                d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z"
                                                fill="#E2761B"
                                                stroke="#E2761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z"
                                                fill="#E2761B"
                                                stroke="#E2761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z"
                                                fill="#E2761B"
                                                stroke="#E2761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z"
                                                fill="#233447"
                                                stroke="#233447"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z"
                                                fill="#D7C1B3"
                                                stroke="#D7C1B3"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z"
                                                fill="#E4761B"
                                                stroke="#E4761B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z"
                                                fill="#D7C1B3"
                                                stroke="#D7C1B3"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z"
                                                fill="#CD6116"
                                                stroke="#CD6116"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z"
                                                fill="#233447"
                                                stroke="#233447"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z"
                                                fill="#763D16"
                                                stroke="#763D16"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z"
                                                fill="#E4751F"
                                                stroke="#E4751F"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z"
                                                fill="#F6851B"
                                                stroke="#F6851B"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z"
                                                fill="#C0AD9E"
                                                stroke="#C0AD9E"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                            <path
                                                d="M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z"
                                                fill="#161616"
                                                stroke="#161616"
                                                stroke-width="5.94955"
                                            />{" "}
                                        </g>{" "}
                                        <defs>
                                            {" "}
                                            <clipPath id="clip0_1512_1323">
                                                {" "}
                                                <rect
                                                    width="2404"
                                                    height="2500"
                                                    fill="white"
                                                    transform="translate(0.519043 0.132812)"
                                                />{" "}
                                            </clipPath>{" "}
                                        </defs>{" "}
                                    </svg>
                                    Connect with MetaMask
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="w-full border border-gray-500  hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-gray-500 rounded-lg text-sm text-center flex justify-center items-center py-2">
                                    <Link to="/">
                                        <div className="flex space-x-2 justify-center items-center cursor-pointer ">
                                            <IoArrowBackCircleOutline
                                                size={30}
                                            />
                                            <span className="text-xl shadow-2xl">
                                                RETURN TO DASHBOARD
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="w-full border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 rounded-lg text-sm text-center flex justify-center items-center py-2">
                                    <div className="flex space-x-2 justify-center items-center">
                                        <img
                                            src={logo}
                                            alt="emptylogo"
                                            className="h-7 w-7 rounded-full"
                                        />
                                        <span className="text-xl shadow-2xl">
                                            {tokenBalance.toFixed(0)}
                                        </span>
                                        <span className="text-xl shadow-2xl">
                                            BLK
                                        </span>
                                    </div>
                                </li>
                                <li className="w-full border border-gray-500 focus:ring-4 focus:outline-none rounded-lg text-sm flex justify-center items-center py-2">
                                    <div className="flex space-x-2 justify-center items-center">
                                        <img
                                            src={blockieImage}
                                            alt="emptylogo"
                                            className="h-7 w-7 rounded-full cursor-pointer"
                                        />
                                        <span className="text-xl shadow-2xl">
                                            {formatAddress(account)}
                                        </span>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </>
            )}

            {/* {showDisconnectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p>Do you want to disconnect your wallet?</p>
                        <p className="text-xs mt-2">
                            For added security, consider locking MetaMask
                            manually after disconnecting.
                        </p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={disconnectWallet}
                                className="bg-red-500 text-white p-2 rounded-lg">
                                Disconnect
                            </button>
                            <button
                                onClick={toggleDisconnectModal}
                                className="bg-gray-300 p-2 rounded-lg">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}
export default Navbar;
