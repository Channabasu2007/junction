import { Briefcase, MapPin } from "lucide-react";

export default function SimpleDesign({ user }) {
  const primaryColor = user?.PageLayout?.ColorsPicker?.primary ?? "#2563eb";
  const secondaryColor = user?.PageLayout?.ColorsPicker?.secondary ?? "#9333ea";
  const paragraphColor = user?.PageLayout?.ColorsPicker?.paragraph ?? "#374151";

  const { jobs } = user;

  return (
    <div className="mt-20 px-6 mb-12">
      {/* Section Title */}
      <h1
        className="text-4xl font-bold tracking-tight mb-12 text-center"
        style={{ color: primaryColor }}
      >
         Work Experience
      </h1>

      {/* Job Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {jobs?.map((job, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] relative"
            style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}
          >
            {/* Icon Badge */}
            <div
              className="absolute -top-5 left-5 flex items-center justify-center w-12 h-12 rounded-full shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              <Briefcase className="w-6 h-6 text-white" />
            </div>

            {/* Job Info */}
            <div className="mt-6">
              {/* Role */}
              <h2
                className="text-xl md:text-2xl font-semibold mb-2"
                style={{ color: primaryColor }}
              >
                {job.role}
              </h2>

              {/* Company + Location */}
              <p
                className="text-sm md:text-base flex font-medium mb-3"
                style={{ color: paragraphColor }}
              >
                {job.company} • {job.location}
              </p>

              {/* Duration / Status */}
              <p
                className="text-sm font-semibold mb-4 px-3 py-1 inline-block rounded-full shadow-sm"
                style={{
                  backgroundColor: job.isWorking
                    ? `${primaryColor}20`
                    : `${secondaryColor}20`,
                  color: job.isWorking ? primaryColor : secondaryColor,
                  border: `1px solid ${job.isWorking ? primaryColor : secondaryColor}`,
                }}
              >
                {job.isWorking ? "✅ Currently Working" : job.duration}
              </p>

              {/* Description */}
              {job.description && (
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: paragraphColor }}
                >
                  {job.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
