import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import Loader from '@/Components/Workers/Loader';
import Image from "next/image";

const MobilePreview = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/fetchDataForDashboard?email=${session.user.email}`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            setUser(data.user);
        } catch (error) {
            showError("Error fetching user data");
        } finally {
            setLoading(false);
        }
    };

    if (loading || status === "loading") {
        return <Loader />;
    }

    return (
        <div>
            <div className="w-full h-5 bg-zinc-800 text-white flex justify-between px-4 items-center text-xs font-mono">
                <span>9:11</span>
                <span className="tracking-widest">📶 🔋</span>
            </div>
            {/* Content area */}
            <div className="h-full overflow-y-auto p-4">
  <div className="w-full max-w-[95%] mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg space-y-6">

    {/* Header */}
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Image
        src={user.profileUrl || "/default-avatar.png"}
        alt={user.userName || "User"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-24 h-24 sm:w-[15%] sm:h-auto rounded-full border object-cover dark:border-zinc-700"
      />
      <div className="text-center sm:text-left w-full sm:w-[80%]">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 break-words">
          {user.firstname} {user.lastname}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">@{user.userName}</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    {/* Banner */}
    {user.bannerUrl && (
      <Image
        src={user.bannerUrl}
        alt="Banner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full max-h-[30vh] rounded-lg object-cover"
      />
    )}

    {/* Basic Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InfoItem label="Email" value={user.email} />
      <InfoItem label="Business Email" value={user.businessEmail} />
      <InfoItem label="Phone" value={user.phone} />
      <InfoItem label="Nickname" value={user.nickname} />
      <InfoItem label="DOB" value={new Date(user.DOB).toLocaleDateString()} />
      <InfoItem label="Location" value={user.location} />
      <InfoItem label="Work Status" value={user.workStatus} />
      <InfoItem label="Premium" value={user.isPremium ? "Yes" : "No"} />
      <InfoItem label="Verified" value={user.verified ? "Yes" : "No"} />
    </div>

    {/* Bio */}
    {user.bio && (
      <div>
        <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Bio</h3>
        <p className="text-zinc-700 dark:text-zinc-300 break-words">{user.bio}</p>
      </div>
    )}

    {/* Education */}
    {user.showEducation && (
      <div>
        <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-100">Education</h3>
        <EducationBlock title="College" data={user.college} />
        <EducationBlock title="High School" data={user.highSchool} />
        <EducationBlock title="Secondary School" data={user.secondarySchool} />
        <EducationBlock title="Primary School" data={user.primarySchool} />
      </div>
    )}

    {/* SEO */}
    <div>
      <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">SEO Details</h3>
      <InfoItem label="Title" value={user.SEO?.title} />
      <InfoItem label="Description" value={user.SEO?.description} />
      <InfoItem
        label="Keywords"
        value={user.SEO?.keywords?.length ? user.SEO.keywords.join(", ") : "Not set"}
      />
      {user.SEO?.thumbnailUrl && (
        <Image
          src={user.SEO.thumbnailUrl}
          alt="SEO Thumbnail"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[50%] max-w-[200px] rounded-lg object-cover"
        />
      )}
    </div>

    {/* Logout */}
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</div>

        </div>
    );
};

export default MobilePreview;


function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-zinc-500 text-sm dark:text-zinc-400">{label}</p>
      <p className="font-medium text-zinc-900 dark:text-zinc-100">{value || "—"}</p>
    </div>
  );
}

function EducationBlock({ title, data }) {
  if (!data) return null;
  return (
    <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg mb-2">
      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
      <p className="text-zinc-700 dark:text-zinc-300">{data.school || data.collegeName}</p>
      {data.degree && (
        <p className="text-zinc-700 dark:text-zinc-300">
          {data.degree} ({data.year})
        </p>
      )}
      {data.stream && <p className="text-zinc-700 dark:text-zinc-300">Stream: {data.stream}</p>}
      {data.percentage && <p className="text-zinc-700 dark:text-zinc-300">Percentage: {data.percentage}</p>}
      {data.field && <p className="text-zinc-700 dark:text-zinc-300">Field: {data.field}</p>}
      {data.board && <p className="text-zinc-700 dark:text-zinc-300">Board: {data.board}</p>}
    </div>
  );
}