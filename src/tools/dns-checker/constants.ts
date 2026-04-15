export const DNS_SERVERS = [
  { id: "google", name: "Google", ip: "8.8.8.8", location: "Global" },
  { id: "cloudflare", name: "Cloudflare", ip: "1.1.1.1", location: "Global" },
  { id: "quad9", name: "Quad9", ip: "9.9.9.9", location: "Global" },
  { id: "opendns", name: "OpenDNS", ip: "208.67.222.222", location: "US" },
  { id: "adguard", name: "AdGuard", ip: "94.140.14.14", location: "Cyprus" },
  {
    id: "cleanbrowsing",
    name: "CleanBrowsing",
    ip: "185.228.168.9",
    location: "US",
  },
  { id: "verisign", name: "Verisign", ip: "64.6.64.6", location: "US" },
  { id: "dnswatch", name: "DNS.WATCH", ip: "84.200.69.80", location: "Germany" },
  { id: "freedns", name: "FreeDNS", ip: "37.235.1.174", location: "Austria" },
  { id: "mullvad", name: "Mullvad", ip: "194.242.2.2", location: "Sweden" },
  { id: "cira", name: "CIRA", ip: "149.112.121.20", location: "Canada" },
  {
    id: "uncensoreddns",
    name: "UncensoredDNS",
    ip: "91.239.100.100",
    location: "Denmark",
  },
] as const;

export const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS"] as const;
