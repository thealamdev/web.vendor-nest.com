import { Member } from "../page";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackageCheck, ShieldCheck, ShoppingCart, X, User, Mail, BadgeInfo } from "lucide-react";

type PageProps = {
  action: () => void;
  isPending: boolean;
  loading: boolean;
  error: Error | null;
  member?: Member;
  roles: any;
  updateForm: any;
  handleUpdateChange: (name: string, value: string) => void;
  handleRemove: (type: string, memberId: string) => void;
};

const getRoleIcon = (slug: string) => {
  switch (slug) {
    case "order-management":
      return <ShoppingCart className="h-5 w-5 text-blue-600" />;
    case "product-management":
      return <PackageCheck className="h-5 w-5 text-emerald-600" />;
    default:
      return <ShieldCheck className="h-5 w-5 text-gray-600" />;
  }
};

export default function MemberUpdateComponent({
  action,
  isPending,
  loading,
  error,
  member,
  roles,
  updateForm,
  handleUpdateChange,
  handleRemove,
}: PageProps) {

  if (loading) return <div className="p-4">Loading...</div>;

  if (error) {
    return (
      <div className="p-4 text-red-500 text-sm">
        Failed to load member details.
      </div>
    );
  }

  if (!member) return null;

  const matchedRoles = roles.filter((role: any) =>
    updateForm.role_ids?.includes(role.id)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ================= USER PROFILE ================= */}
      <div className="space-y-4">

        <div className="rounded-2xl border p-4 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-600" />
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                {member.user.name}
              </h2>
              <p className="text-sm text-muted-foreground capitalize">
                {member.user.type}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              {member.user.email}
            </div>
          </div>
        </div>

        {/* ================= INVITER ================= */}
        <div className="rounded-2xl border p-4 bg-white shadow-sm">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
            <BadgeInfo className="h-4 w-4" />
            Invited By
          </h3>

          <p className="text-sm">{member.inviter.name}</p>
          <p className="text-xs text-muted-foreground">
            {member.inviter.email}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {member.inviter.type}
          </p>
        </div>

      </div>

      {/* ================= ROLES (ONLY EDITABLE PART) ================= */}
      <form action={action} className="lg:col-span-2 space-y-4">

        <div className="rounded-2xl border p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-4">Roles</h3>

          {/* Select Role */}

          <Select
            onValueChange={(value) =>
              handleUpdateChange("role_ids", value)
            }
          >
            <SelectTrigger className="!h-11 w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>

            <SelectContent>
              {roles.map((role: any) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Selected Roles */}
          <div className="mt-4 space-y-3">
            {matchedRoles?.map((role: any) => (
              <div
                key={role.id}
                className="flex items-start justify-between rounded-xl border p-4"
              >
                <div className="flex gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getRoleIcon(role.slug)}
                  </div>

                  <div>
                    <p className="font-medium text-sm">
                      {role.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {role.slug}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove("update", role.id)}
                  type="button"
                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-black text-white rounded-xl text-sm disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update Member"}
          </button>
        </div>
        
      </form>
    </div>
  );
}